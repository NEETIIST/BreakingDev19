const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
var async = require('async');

// Load User model
const User = require("../../models/User");
const AdminProfile = require("../../models/AdminProfile");
const DevProfile = require("../../models/DevProfile");
const Idea = require("../../models/Idea");

// Load input validation
const validateAdminProfileInput = require("../../validation/adminProfile");

// Load Email Templates and Function
const emails = require('../../emails');

/* THIS ROUTE IS OBSOLETE, users now register as admins on account creation
// @route POST api/admins/access
// @desc Grants Admin Access to a user and updates their JWT Token
router.post("/access", verifyToken, (req, res) => {

    // Check admin password
    // Check validation
    if ( req.body.password != keys.adminPass ) {
        return res.status(403).send("Wrong Password");
    }

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("This user doesn't exist");

        // Only 'starters' role can become Admins
        if ( user.role != 'starter' ){
            return res.status(403).send("You already have a role");
        }

        // Change user role and update the JWT Token
        user.role = "admin";
        user.save()
            .then(u => {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: "admin",
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.status(200).json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            })
            .catch(err => console.log(err));
    });
});
*/

// @route POST api/admins/create
// @desc Create Admin Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'starter'
router.post("/create", verifyToken, (req, res) => {

    AdminProfile.findOne({"username":req.username}, function (err, adm) {
        if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
        if (adm) return res.status(403).send("This user already has an Staff Profile");

        // Only 'staff' role can create a new admin Profile
        if ( req.role !== 'staff' ){
            return res.status(403).send("You don't have permission for this action");
        }

        // Form validation
        const { errors, isValid } = validateAdminProfileInput(req.body);
        // Check validation
        if (!isValid) {
            console.log(errors);
            return res.status(400).json(errors);
        }

        const newAdmin = new AdminProfile({
            username: req.username,
            name: req.body.name,
            age: req.body.age,
            college: req.body.college,
            course: req.body.course,
            phone: req.body.phone,
            bio: req.body.bio,
            job: req.body.job,
            skills: req.body.skills,
            github: req.body.github,
            twitter: req.body.twitter,
            linkedin: req.body.linkedin,
        });

        newAdmin
            .save()
            .then(adm => {
                console.log("Sucessfully created an Staff Profile for the user: " + adm.username);
                return res.status(200).send(adm);
            })
            .catch(err => console.log(err));

    });

});

// @route GET api/admins/me
// @desc Returns the logged user staff Profile
// No permission check necessary, because only authorized users have their staff profile
router.get("/me", verifyToken, (req, res) => {

    AdminProfile.findOne({"username":req.username}, AdminProfile.adminInfo, function (err, adm) {
        if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
        if (!adm) return res.status(404).send("No Staff Profile found for this username");

        //emails.sendEmail(emails.createdAccount({}), req.username);

        // The Dev Profile will always be the one of the logged user
        return res.status(200).send(adm);
    });

});


// @route PUT api/admins/me/edit
// @desc Edits the logged staff profile
// No permission check necessary, because only authorized users have their staff profile
// Returns the Updated Staff Profile
router.put("/me/edit", verifyToken, (req, res) => {

    // TODO: Perform backend validation of skills

    // Form validation
    const { errors, isValid } = validateAdminProfileInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    AdminProfile.findOneAndUpdate({"username":req.username}, req.body, {new: true}, function (err, adm) {
        if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
        if (!adm) return res.status(404).send("No Staff Profile found for this username");

        return res.status(200).send(adm);
    });

});


// @route GET api/admins/overview
// @desc Returns some information for Overview
// @permissions Only admins can get this information
router.get("/overview", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }


    let response = {
        "devCount":undefined,
        "staffCount":undefined,
        "teamCount": 0,
        "ideasApproved": undefined,
        "ideasPending": undefined,
    };
    var tasks = [
        // idea.approved===false && idea.hidden===false
        function(callback) { DevProfile.find( function (err, devs) { response.devCount = devs.length; callback(); }); },
        function(callback) { AdminProfile.find( function (err, adms) { response.staffCount = adms.length; callback(); }); },
        function(callback) { Idea.find({approved:true}, function (err, ideas) { response.ideasApproved = ideas.length; callback(); }); },
        function(callback) { Idea.find({$and:[{approved:false},{hidden:false}]}, function (err, ideas) { console.log(":"+ideas);response.ideasPending = ideas.length; callback(); }); },
    ];

    async.parallel(tasks, function(err) {
        if (err) return res.status(500).send(err);
        return res.status(200).send(response);
    });

});


// @route POST api/staff/me/files/:target
// @desc Upload New File (CV or Profile Picture)
// @access Own, user changes its own profile picture
router.post("/me/files/:target", verifyToken, (req, res) => {

    // TODO: TEST AFTER DEPLOYMENT
    const target = req.params['target'];
    let data;
    if ( target !== "cv" && target !== "profile" ) return res.status(403).send("Not a valid Target");
    if ( req.files === undefined ) return res.status(403).send("Didn't receive a file");
    let file = req.files.file;

    const uuidv1 = require('uuid/v1');
    const filename = uuidv1()+"."+file.name.split(".")[1];   // Randomly Unique Generated To Prevent Scrapping

    if ( target === "cv")
    {
        if( file.size > 10000000) return res.status(403).send("File too big");
        if( !(file.mimetype==="application/pdf" || file.mimetype==="application/x-pdf" )) return res.status(403).send("Not a PDF File");
        data = {"cv":filename};
    }
    else if ( target === "profile")
    {
        if( file.size > 3000000) return res.status(403).send("Image too big");
        if( !(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg")) return res.status(403).send("Not an Image");
        data = {"picture":filename};
    }

    const appRoot = require('app-root-path');
    //let dir = appRoot.path.substr(0, appRoot.path.lastIndexOf("/"))+"/bdev-frontend";
    let dir = appRoot;

    file.mv(dir+"/public/"+target+"/"+filename, function(err) {
        if (err) { console.log(err); return res.status(500).send(err); }

        AdminProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, adm) {
            if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
            if (!adm) return res.status(404).send("No Staff Profile found for this username");
            return res.status(200).send(adm);
        });
    });

});

// @route Put api/staff/me/files/picture
// @desc Remove current profile picture
// @access Own, user changes its own profile picture
router.put("/me/files/:target/remove", verifyToken, (req, res) => {

    const target = req.params['target'];
    if ( target !== "cv" && target !== "profile" ) return res.status(403).send("Not a valid Target");
    let data;
    if ( target === "cv" ) data = {"cv":""};
    if ( target === "profile" ) data = {"profile":""};

    AdminProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, adm) {
        if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
        if (!adm) return res.status(404).send("No Staff Profile found for this username");
        return res.status(200).send(adm);
    });

});

module.exports = router;


