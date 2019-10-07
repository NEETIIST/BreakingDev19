const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
var async = require('async');

// Load User model
const User = require("../../models/User");
const DevProfile = require("../../models/DevProfile");
const Team = require("../../models/Team");

// Load input validation
const validateDevProfileInput = require("../../validation/devProfile");

// Load Email Templates and Function
//const emails = require('../../emails');

// @route POST api/devs/create
// @desc Create Dev Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'dev'
router.post("/create", verifyToken, (req, res) => {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("This user doesn't exist");

        // If user already has a DevProfile he can't create another one
        DevProfile.findOne({"username":user.username}, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
            if (dev) return res.status(403).send("This user already has a Dev Profile");

            // Only 'devs' role can create a new devProfile
            if ( req.role !== 'dev' ){ // Might add more specific errors here
                return res.status(403).send("You don't have permission for this action");
            }

            // Form validation
            const { errors, isValid } = validateDevProfileInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newDev = new DevProfile({
                username: req.username,
                name: req.body.name,
                age: req.body.age,
                college: req.body.college,
                course: req.body.course,
                phone: req.body.phone,
                bio: req.body.bio,
                skills: req.body.skills,
                github: req.body.github,
                twitter: req.body.twitter,
                linkedin: req.body.linkedin,
                food: req.body.food,
                needsTeam: req.body.needsTeam,
                cv: "",
                picture: "",
                team: 0,
                pending: false,
                validated: false,
                payment: {
                    confirmed: false,
                    promocode: "",
                    price: -1,
                    file: "",
                }

            });

            newDev
                .save()
                .then(dev => {
                    console.log("Sucessfully created a Dev Profile for the user: " + dev.username);
                    return res.status(200).send(dev);
                })
                .catch(err => console.log(err));

            console.log("Sucessfully created a Dev Profile for the user: " + user.username);
        });
    });

});

// @route GET api/devs/me
// @desc Returns the logged user dev Profile
// No permission check necessary, because only authorized users have their dev profile
router.get("/me", verifyToken, (req, res) => {

    //console.log(req.role);

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this user");

        // The Dev Profile will always be the one of the logged user
        return res.status(200).send(dev);
    });

});


// @route GET api/devs/me/overview
// @desc Returns the logged user dev Profile
// No permission check necessary, because only authorized users have their dev profile
router.get("/me/overview", verifyToken, (req, res) => {

    //console.log(req.role);
    if ( req.role !== 'dev' ){
        return res.status(403).send("You don't have permission for this action");
    }

    let response = {
        "isValidated":undefined,
        "hasTeam":undefined,
        "teamValidated": undefined,
        "paymentConfirmed": undefined,
        "isCaptain":undefined,
    };

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this user");
        response.isValidated = dev.validated;
        response.paymentConfirmed = dev.payment.confirmed;
        if (dev.team === 0)
        {
            response.hasTeam = false;
            response.teamValidated = false;
            return res.status(200).send(response);
        }
        else
        {
            Team.findOne({"number":dev.team}, Team.ownerInfo, function (err, team) {
                if (err) return res.status(500).send("There was a problem finding the team.");
                if (!team) return res.status(404).send("No team found");

                response.hasTeam = true;
                response.teamValidated = team.validated;
                response.isCaptain = (team.captain === dev.username);
                return res.status(200).send(response);
            });

        }
    });

});


// @route PUT api/devs/me/edit
// @desc Expects an updated Dev Profile form
// No permission check necessary, because only authorized users have their dev profile
// If user is validated or pending, some fields cannot be changed
router.put("/me/edit", verifyToken, (req, res) => {

    // Form validation
    const { errors, isValid } = validateDevProfileInput (req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        // Fields that the user can't update on his own

        // Fields that can't be changed after
        delete req.body.validated; delete req.body.pending; delete req.body.payment; delete req.body.team; delete req.body.username;
        if ( dev.validated || dev.pending ){ req.body.name=dev.name; req.body.age=dev.age; req.body.phone=dev.phone; req.body.college=dev.college; req.body.course=dev.course; }

        Object.assign(dev, req.body);
        dev .save()
            .then(dev => { return res.status(200).send(dev); })
            .catch(err => console.log(err));

    });

});

// @route GET api/devs/_:username
// @desc Returns the dev matching the username
// Permissions change the information returned
// Admins get all the info
// Sponsors get the same info as the owner
// Public gets only public info
router.get("/_:username", verifyToken, (req, res) => {

    // Regular users retrieve only the public information
    let fields = DevProfile.publicInfo;

    // Admins retrieve all the information with this request
    if ( req.role === 'staff' ) fields = DevProfile.adminInfo;

    DevProfile.findOne({"username":req.params['username']}, fields, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });
});


// @route GET api/devs/_:username/email
// @desc Returns the dev matching the username email
// For now, only admins can use this route
router.get("/_:username/email", verifyToken, (req, res) => {

    // Only 'staff' role can request all devs
    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }

    User.findOne({"username":req.params['username']}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found for this username");

        return res.status(200).send(user.email);
    });
});


// @route GET api/devs/all
// @desc Returns all dev profiles
// @permissions For Staff Only
router.get("/all", verifyToken, (req, res) => {

    // Only 'staff' role can request all devs
    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }

    DevProfile.find({}, DevProfile.adminInfo, function (err, devs) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profiles.");
        if (!devs) return res.status(404).send("No Dev Profiles were found");

        return res.status(200).send(devs);
    });

});


// @route PUT api/devs/me/validate
// @desc Request validation to the admins
// The logged user requests validation for himself
router.put("/me/validate", verifyToken, (req, res) => {

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem updating the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        if ( dev.validated ) return res.status(403).send("This Dev is already validated.");
        if ( dev.pending ) return res.status(403).send("This Dev is already pending validation.");

        let updatedDev = dev;
        updatedDev.pending = true;

        dev .save(updatedDev)
            .then(dev => {
                // Send Email informing the Staff
                //emails.sendStaffEmail(emails.userRequestedValidation({name:dev.name, username:dev.username}));
                return res.status(200).send(dev);
            })
            .catch(err => console.log(err));
    });
});

// @route PUT api/devs/me/validate/cancel
// @desc Request to cancel the validation to the admins
// The logged user cancels it's own request
router.put("/me/validate/cancel", verifyToken, (req, res) => {

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem updating the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        if ( dev.validated ) return res.status(403).send("This Dev is already validated.");
        if ( !dev.pending ) return res.status(403).send("This Dev is not currently pending any validation.");

        let updatedDev = dev;
        updatedDev.pending = false;

        dev .save(updatedDev)
            .then(dev => { return res.status(200).send(dev); })
            .catch(err => console.log(err));
    });

});

// @route PUT api/devs/_:username/validate
// @desc Validates a Dev Profile
// @permissions Staffs Only
router.put("/_:username/validate", verifyToken, (req, res) => {

    // Only Staffs can approve other Devs
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {validated:true, pending:false}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        // Send Email informing the User
        //emails.sendEmail(emails.profileValidated({name:dev.name}), dev.username);

        return res.status(200).send(dev);
    });

});

// @route PUT api/devs/_:username/invalidate
// @desc Cancels the Validation of a dev profile
// @permissions Staffs Only
router.put("/_:username/invalidate", verifyToken, (req, res) => {

    // Only Staffs can approve other Devs
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {validated:false, pending:false}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });

});


// @route PUT api/devs/_:username/confirmPayment
// @desc Confirms Dev Payment
// @permissions Staffs Only
router.put("/_:username/confirmPayment", verifyToken, (req, res) => {

    // Only Staffs can approve other Devs
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {$set:{"payment.confirmed":true}}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });

});

// @route PUT api/devs/_:username/cancelPayment
// @desc Cancel Dev Payment
// @permissions Staffs Only
router.put("/_:username/cancelPayment", verifyToken, (req, res) => {

    // Only Staffs can approve other Devs
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {$set:{"payment.confirmed":false}}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });

});


// @route POST api/devs/me/files/:target
// @desc Upload New File (CV or Profile Picture)
// @access Own, user changes its own profile picture
router.post("/me/files/:target", verifyToken, (req, res) => {

    const target = req.params['target'];
    let data;
    if ( target !== "cv" && target !== "profile" && target !== "paymentFile" ) return res.status(403).send("Not a valid Target");
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
    else if ( target === "paymentFile")
    {
        if( file.size > 3000000) return res.status(403).send("Image too big");
        if( !(file.mimetype==="image/png" || file.mimetype==="image/jpg" || file.mimetype==="image/jpeg" || file.mimetype==="application/pdf" || file.mimetype==="application/x-pdf")) return res.status(403).send("Not an Image or PDF");
        data = {$set:{"payment.file":filename}};
    }

    const appRoot = require('app-root-path');
    //let dir = appRoot.path.substr(0, appRoot.path.lastIndexOf("/"))+"/bdev-frontend";
    let dir = appRoot;

    file.mv(dir+"/public/"+target+"/"+filename, function(err) {
        if (err) { console.log(err); return res.status(500).send(err); }

        DevProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
            if (!dev) return res.status(404).send("No Dev Profile found for this username");
            return res.status(200).send(dev);
        });
    });

});

// @route PUT api/devs/me/files/:target/remove
// @desc Remove current profile picture / file
// @access Own, user changes its own files
router.put("/me/files/:target/remove", verifyToken, (req, res) => {

    const target = req.params['target'];
    if ( target !== "cv" && target !== "profile" && target !== "paymentFile") return res.status(403).send("Not a valid Target");
    let data;
    if ( target === "cv" ) data = {"cv":""};
    if ( target === "profile" ) data = {"profile":""};
    if ( target === "paymentFile" ) data = {$set:{"payment.file":""}};

    DevProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");
        return res.status(200).send(dev);
    });

});


// @route GET api/devs/me/price
// @desc Returns this user admission price
// @access Own, returns the user who made the request
router.get("/me/price", verifyToken, (req, res) => {

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        // If no code used, price equals current admission price
        if ( dev.payment.price === -1 )
            dev.payment.price = keys.admissionPrice;

        return res.status(200).send(dev.payment);
    });

});

module.exports = router;

