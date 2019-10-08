const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
var async = require('async');

// Load User model
const User = require("../../models/User");
const GuestProfile = require("../../models/GuestProfile");

// Load input validation
const validateGuestProfileInput = require("../../validation/guestProfile");

// Load Email Templates and Function
//const emails = require('../../emails');

// @route POST api/guests/create
// @desc Create Guest Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'guest'
router.post("/create", verifyToken, (req, res) => {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("This user doesn't exist");

        // If user already has a DevProfile he can't create another one
        GuestProfile.findOne({"username":user.username}, function (err, guest) {
            if (err) return res.status(500).send("There was a problem finding the Guest Profile.");
            if (guest) return res.status(403).send("This user already has a Guest Profile");

            // Only 'guest' role can create a new devProfile
            if ( req.role !== 'guest' ){ // Might add more specific errors here
                return res.status(403).send("You don't have permission for this action");
            }

            // Form validation
            const { errors, isValid } = validateGuestProfileInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newGuest = new GuestProfile({
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
                cv: "",
                picture: "",

            });

            newGuest
                .save()
                .then(guest => {
                    //console.log("Sucessfully created a Dev Profile for the user: " + dev.username);
                    return res.status(200).send(guest);
                })
                .catch(err => console.log(err));

        });
    });

});



// @route GET api/guests/me
// @desc Returns the logged user guest Profile
// No permission check necessary, because only authorized users have their guest profile
router.get("/me", verifyToken, (req, res) => {

    GuestProfile.findOne({"username":req.username}, GuestProfile.ownerInfo, function (err, guest) {
        if (err) return res.status(500).send("There was a problem finding the Guest Profile.");
        if (!guest) return res.status(404).send("No Guest Profile found for this user");

        // The Dev Profile will always be the one of the logged user
        return res.status(200).send(guest);
    });

});



// @route PUT api/guests/me/edit
// @desc Expects an updated guest Profile form
// No permission check necessary, because only authorized users have their guest profile
router.put("/me/edit", verifyToken, (req, res) => {

    // Form validation
    const { errors, isValid } = validateGuestProfileInput (req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    GuestProfile.findOne({"username":req.username}, GuestProfile.ownerInfo, function (err, guest) {
        if (err) return res.status(500).send("There was a problem finding the guest Profile.");
        if (!guest) return res.status(404).send("No guest Profile found for this username");

        for ( field in req.body ){ if(GuestProfile.ownerInfo[field] === undefined ) delete req.body[field]; }

        Object.assign(guest, req.body);
        guest .save()
            .then(guest => { return res.status(200).send(guest); })
            .catch(err => console.log(err));

    });

});


// @route GET api/guests/all
// @desc Returns all guest profiles
// @permissions For Staff Only
router.get("/all", verifyToken, (req, res) => {

    // Only 'staff' and 'sponsor' role can request all devs
    if ( !(req.role === 'staff' || req.role==="sponsor")){
        return res.status(403).send("You don't have permission for this action");
    }

    // Regular users retrieve only the public information
    let fields = GuestProfile.publicInfo;

    // Admins retrieve all the information with this request
    if ( req.role === 'staff' || req.role === "sponsor" ) fields = GuestProfile.ownerInfo;

    GuestProfile.find({}, fields, function (err, guests) {
        if (err) return res.status(500).send("There was a problem finding the Guest Profiles.");
        if (!guests) return res.status(404).send("No Guest Profiles were found");

        return res.status(200).send(guests);
    });

});



// @route POST api/guests/me/files/:target
// @desc Upload New File (CV or Profile Picture)
// @access Own, user changes its own profile picture
router.post("/me/files/:target", verifyToken, (req, res) => {

    const target = req.params['target'];
    let data;
    if ( target !== "cv" && target !== "profile") return res.status(403).send("Not a valid Target");
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

        GuestProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, guest) {
            if (err) return res.status(500).send("There was a problem finding the guest Profile.");
            if (!guest) return res.status(404).send("No guest Profile found for this username");
            return res.status(200).send(guest);
        });
    });

});

// @route PUT api/guests/me/files/:target/remove
// @desc Remove current profile picture / file
// @access Own, user changes its own files
router.put("/me/files/:target/remove", verifyToken, (req, res) => {

    const target = req.params['target'];
    if ( target !== "cv" && target !== "profile") return res.status(403).send("Not a valid Target");
    let data;
    if ( target === "cv" ) data = {"cv":""};
    if ( target === "profile" ) data = {"profile":""};

    GuestProfile.findOneAndUpdate({"username":req.username}, data, {new: true}, function (err, guest) {
        if (err) return res.status(500).send("There was a problem finding the guest Profile.");
        if (!guest) return res.status(404).send("No guest Profile found for this username");
        return res.status(200).send(guest);
    });

});

module.exports = router;
