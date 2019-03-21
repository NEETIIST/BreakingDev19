const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
const accessControl = require('../accessControl');
const isEmpty = require("is-empty");

// Load input validation
const validateDevProfileInput = require("../../validation/devProfile");

// Load User model
const User = require("../../models/User");
const DevProfile = require("../../models/DevProfile");

// @route POST api/devs/create
// @desc Create Dev Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'starter'
router.post("/create", verifyToken, (req, res) => {

    let loggedUser = undefined ;

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No logged user.");

        // If user already has a DevProfile he can't create another one
        DevProfile.findOne({"username":user.username}, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
            if (dev) return res.status(403).send("This user already has a Dev Profile");

            // Only 'starters' role can create a new devProfile
            const permission = accessControl.can(user.role).createOwn('devProfile');
            if ( ! permission.granted ){ // Might add more specific errors here
                return res.status(403).send("You don't have permission for this action");
            }

            // Form validation
            const { errors, isValid } = validateDevProfileInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }

            const newDev = new DevProfile({
                userid: req.userId,
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
                payment: false,
            });

            newDev
                .save()
                .then(d => {res.status(200).json(d)})  // Find a way to return only the public fields
                .catch(err => console.log(err));

            // After creating the DevProfile, change the current user Role to dev
            user.role = "dev";
            user.save();

            console.log("Sucessfully created a Dev Profile for the user: " + user.username);
        });

    });

});

// @route GET api/devs/me
// @desc Returns the logged user dev Profile
// No permission check necessary, because only authorized users have their dev profile
router.get("/me", verifyToken, (req, res) => {

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        // How do I hide Non-Public fields?
        return res.status(200).send(dev);
    });

});

module.exports = router;

