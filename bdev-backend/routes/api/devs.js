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
// And checks for role permission, must be 'starter'
router.post("/create", verifyToken, (req, res) => {

    User.findById(req.userId, { password: 0 }, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("This user doesn't exist");

        // If user already has a DevProfile he can't create another one
        DevProfile.findOne({"username":user.username}, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
            if (dev) return res.status(403).send("This user already has a Dev Profile");

            // Only 'starters' role can create a new devProfile
            if ( req.role != 'starter' ){ // Might add more specific errors here
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
                payment: false,
            });

            newDev
                .save()
                .then(dev => {
                    // Create JWT Payload
                    const payload = {
                        id: user.id,
                        username: user.username,
                        role: "dev",
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

            // After creating the DevProfile, change the current user Role to dev and sign new auth-token
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

    //console.log(req.role);

    DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

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

    DevProfile.findOneAndUpdate({"username":req.username}, req.body, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send("User Dev Profile Updated");
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
    if ( req.role == 'admin' ) fields = DevProfile.adminInfo;

    DevProfile.findOne({"username":req.params['username']}, fields, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile.");
        if (!dev) return res.status(404).send("No Dev Profile found for this username");

        return res.status(200).send(dev);
    });

});


module.exports = router;

