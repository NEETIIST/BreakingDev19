const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
var async = require('async');

// Load User model
const User = require("../../models/User");
const VolunteerProfile = require("../../models/VolunteerProfile");

// Load input validation
const validateVolunteerProfileInput = require("../../validation/volunteerProfile");

// Load Email Templates and Function
//const emails = require('../../emails');

// @route POST api/volunteers/create
// @desc Create Volunteer Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'volunteer'
router.post("/create", verifyToken, (req, res) => {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("This user doesn't exist");

        // If user already has a VolunteerProfile he can't create another one
        VolunteerProfile.findOne({"username":user.username}, function (err, vol) {
            if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
            if (vol) return res.status(403).send("This user already has a Volunteer Profile");

            // Only 'volunteers' role can create a new volunteerProfile
            if ( req.role !== 'volunteer' ){ // Might add more specific errors here
                return res.status(403).send("You don't have permission for this action");
            }

            // Form validation
            const { errors, isValid } = validateVolunteerProfileInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newVolunteer = new VolunteerProfile({
                username: req.username,
                name: req.body.name,
                age: req.body.age,
                college: req.body.college,
                course: req.body.course,
                phone: req.body.phone,
                bio: req.body.bio,
                motivation:req.body.motivation,
                skills: req.body.skills,
                github: req.body.github,
                twitter: req.body.twitter,
                linkedin: req.body.linkedin,
                food: req.body.food,
                cv: "",
                picture: "",
                pending: false,
                validated: false,
            });

            newVolunteer
                .save()
                .then(vol => {
                    console.log("Sucessfully created a Volunteer Profile for the user: " + vol.username);
                    return res.status(200).send(vol);
                })
                .catch(err => console.log(err));

        });
    });

});

// @route GET api/volunteers/me
// @desc Returns the logged user Volunteer Profile
// No permission check necessary, because only authorized users have their Volunteer profile
router.get("/me", verifyToken, (req, res) => {

    VolunteerProfile.findOne({"username":req.username}, VolunteerProfile.ownerInfo, function (err, vol) {
        if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
        if (!vol) return res.status(404).send("No Volunteer Profile found for this user");

        // The Volunteer Profile will always be the one of the logged user
        return res.status(200).send(vol);
    });

});



// @route PUT api/volunteers/me/edit
// @desc Expects an updated Volunteer Profile form
// No permission check necessary, because only authorized users have their Volunteer profile
// If user is validated or pending, some fields cannot be changed
router.put("/me/edit", verifyToken, (req, res) => {

    // Form validation
    const { errors, isValid } = validateVolunteerProfileInput (req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    VolunteerProfile.findOne({"username":req.username}, VolunteerProfile.ownerInfo, function (err, vol) {
        if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
        if (!vol) return res.status(404).send("No Volunteer Profile found for this username");

        // Fields that the user can't update on his own

        // Fields that can't be changed after
        delete req.body.validated; delete req.body.pending; delete req.body.username;
        if ( vol.validated || vol.pending ){ req.body.name=vol.name; req.body.age=vol.age; req.body.phone=vol.phone; req.body.college=vol.college; req.body.course=vol.course; req.body.motivation=vol.motivation; }

        Object.assign(vol, req.body);
        vol .save()
            .then(vol => { return res.status(200).send(vol); })
            .catch(err => console.log(err));

    });

});



// @route GET api/volunteers/_:username
// @desc Returns the volunteers matching the username
// Permissions change the information returned
// Admins get all the info
// Sponsors get the same info as the owner
// Public gets only public info
router.get("/_:username", verifyToken, (req, res) => {

    // Regular users retrieve only the public information
    let fields = VolunteerProfile.publicInfo;

    // Admins retrieve all the information with this request
    if ( req.role === 'staff' ) fields = VolunteerProfile.adminInfo;

    VolunteerProfile.findOne({"username":req.params['username']}, fields, function (err, vol) {
        if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
        if (!vol) return res.status(404).send("No Volunteer Profile found for this username");

        return res.status(200).send(vol);
    });
});


// @route GET api/volunteers/_:username/email
// @desc Returns the Volunteer matching the username email
// For now, only admins can use this route
router.get("/_:username/email", verifyToken, (req, res) => {

    // Only 'staff' role can request by username volunteers
    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }

    User.findOne({"username":req.params['username']}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found for this username");

        return res.status(200).send(user.email);
    });
});


// @route GET api/volunteers/all
// @desc Returns all Volunteer profiles
// @permissions For Staff Only
router.get("/all", verifyToken, (req, res) => {

    // Only 'staff' role can request all Volunteers
    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }

    VolunteerProfile.find({}, VolunteerProfile.adminInfo, function (err, vols) {
        if (err) return res.status(500).send("There was a problem finding the Volunteer Profiles.");
        if (!vols) return res.status(404).send("No Volunteer Profiles were found");

        return res.status(200).send(vols);
    });

});



// @route PUT api/volunteers/me/validate
// @desc Request validation to the admins
// The logged user requests validation for himself
router.put("/me/validate", verifyToken, (req, res) => {

    VolunteerProfile.findOne({"username":req.username}, VolunteerProfile.ownerInfo, function (err, vol) {
        if (err) return res.status(500).send("There was a problem updating the VolunteerProfile.");
        if (!vol) return res.status(404).send("No VolunteerProfile found for this username");

        if ( vol.validated ) return res.status(403).send("This Volunteer is already validated.");
        if ( vol.pending ) return res.status(403).send("This Volunteer is already pending validation.");

        let updatedVolunteer = vol;
        updatedVolunteer.pending = true;

        vol .save(updatedVolunteer)
            .then(vol => {
                return res.status(200).send(vol);
            })
            .catch(err => console.log(err));
    });
});


// @route PUT api/volunteers/me/validate/cancel
// @desc Request to cancel the validation to the admins
// The logged user cancels it's own request
router.put("/me/validate/cancel", verifyToken, (req, res) => {

    VolunteerProfile.findOne({"username":req.username}, VolunteerProfile.ownerInfo, function (err, vol) {
        if (err) return res.status(500).send("There was a problem updating the Volunteer Profile.");
        if (!vol) return res.status(404).send("No Volunteer Profile found for this username");

        if ( vol.validated ) return res.status(403).send("This Volunteer is already validated.");
        if ( !vol.pending ) return res.status(403).send("This Volunteer is not currently pending any validation.");

        let updatedVolunteer = vol;
        updatedVolunteer.pending = false;

        vol .save(updatedVolunteer)
            .then(vol => { return res.status(200).send(vol); })
            .catch(err => console.log(err));
    });

});

// @route PUT api/volunteers/_:username/validate
// @desc Validates a Volunteer Profile
// @permissions Staffs Only
router.put("/_:username/validate", verifyToken, (req, res) => {

    // Only Staffs can approve other Volunteer
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    VolunteerProfile.findOneAndUpdate({"username":req.params['username']},
        {validated:true, pending:false},
        {projection: VolunteerProfile.adminInfo, new: true},
        function (err, vol) {
            if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
            if (!vol) return res.status(404).send("No Volunteer Profile found for this username");
            return res.status(200).send(vol);
    });

});

// @route PUT api/volunteers/_:username/invalidate
// @desc Cancels the Validation of a Volunteer profile
// @permissions Staffs Only
router.put("/_:username/invalidate", verifyToken, (req, res) => {

    // Only Staffs can approve other Volunteer
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    VolunteerProfile.findOneAndUpdate({"username":req.params['username']},
        {validated:false, pending:false},
        {projection: VolunteerProfile.adminInfo, new: true},
        function (err, vol) {
            if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
            if (!vol) return res.status(404).send("No Volunteer Profile found for this username");
            return res.status(200).send(vol);
    });

});




// @route POST api/volunteers/me/files/:target
// @desc Upload New File (CV or Profile Picture)
// @access Own, user changes its own profile picture
router.post("/me/files/:target", verifyToken, (req, res) => {

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

        VolunteerProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, vol) {
            if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
            if (!vol) return res.status(404).send("No Volunteer Profile found for this username");
            return res.status(200).send(vol);
        });
    });

});

// @route PUT api/volunteers/me/files/:target/remove
// @desc Remove current profile picture / file
// @access Own, user changes its own files
router.put("/me/files/:target/remove", verifyToken, (req, res) => {

    const target = req.params['target'];
    if ( target !== "cv" && target !== "profile" ) return res.status(403).send("Not a valid Target");
    let data;
    if ( target === "cv" ) data = {"cv":""};
    if ( target === "profile" ) data = {"profile":""};

    VolunteerProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, vol) {
        if (err) return res.status(500).send("There was a problem finding the Volunteer Profile.");
        if (!vol) return res.status(404).send("No Volunteer Profile found for this username");
        return res.status(200).send(vol);
    });

});


module.exports = router;
