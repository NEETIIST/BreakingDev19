const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load User model
const User = require("../../models/User");
const DevProfile = require("../../models/DevProfile");

// Load input validation
const validateDevProfileInput = require("../../validation/devProfile");

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
                hasTeam: false,
                pending: false,
                validated: false,
                payment: false,

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

// @route PUT api/devs/me/edit
// @desc Expects an updated Dev Profile form
// No permission check necessary, because only authorized users have their dev profile
router.put("/me/edit", verifyToken, (req, res) => {

    // Form validation
    const { errors, isValid } = validateDevProfileInput (req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    DevProfile.findOneAndUpdate({"username":req.username}, req.body, {projection: DevProfile.ownerInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
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

        if ( dev.approved ) return res.status(403).send("This Dev is already approved.");
        if ( dev.pending ) return res.status(403).send("This Dev is already pending approval.");

        let updatedDev = dev;
        updatedDev.pending = true;

        dev .save(updatedDev)
            .then(dev => { return res.status(200).send(dev); })
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

        if ( dev.approved ) return res.status(403).send("This Dev is already approved.");
        if ( !dev.pending ) return res.status(403).send("This Dev is not currently pending any approval.");

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

        return res.status(200).send(dev);
    });

});

// @route PUT api/devs/_:username/invalidate
// @desc Cancels the Validation of a dev profile
// @permissions Staffs Only
router.put("/_:username/invalidate", verifyToken, (req, res) => {

    console.log("here");
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

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {payment:true}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
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

    DevProfile.findOneAndUpdate({"username":req.params['username']}, {payment:false}, {projection: DevProfile.adminInfo, new: true}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });

});

module.exports = router;

