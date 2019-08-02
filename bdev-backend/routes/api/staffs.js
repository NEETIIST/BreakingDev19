const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load input validation

// Load User model
const User = require("../../models/User");
const AdminProfile = require("../../models/AdminProfile");

// Load input validation
const validateAdminProfileInput = require("../../validation/adminProfile");

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

    AdminProfile.findOne({"username":req.username}, DevProfile.adminInfo, function (err, adm) {
        if (err) return res.status(500).send("There was a problem finding the Staff Profile.");
        if (!adm) return res.status(404).send("No Staff Profile found for this username");

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

module.exports = router;


