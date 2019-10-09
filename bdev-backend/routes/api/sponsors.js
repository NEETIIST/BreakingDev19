const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load User model
const DevProfile = require("../../models/DevProfile");
const GuestProfile = require("../../models/GuestProfile");
//const AdminProfile = require("../../models/AdminProfile");
const VolunteerProfile = require("../../models/VolunteerProfile");


// @route GET api/sponsors/_:username/short
// @desc Returns the users profile, with short information
// For now, only admins can use this route
router.get("/_:username/short", verifyToken, (req, res) => {

    // Only 'staff' role can request all devs
    if ( !(req.role === 'staff' || req.role === 'sponsor') ){
        return res.status(403).send("You don't have permission for this action");
    }

    let target = req.params['username'];

    User.findOne({"username":target}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found for this username");

        //console.log(user);

        if ( user.role === "staff" ) return res.status(404).send("Staff User");
        if ( user.role === "dev" ){
            DevProfile.findOne({"username":target}, {name:1,picture:1}, function (err, profile) {
                if (err) return res.status(500).send("There was a problem finding the Profile.");
                if (!profile) return res.status(404).send("No Profile found for this username");
                return res.status(200).send(profile);
            }); }
        if ( user.role === "volunteer" ){
            VolunteerProfile.findOne({"username":target}, {name:1,picture:1}, function (err, profile) {
                if (err) return res.status(500).send("There was a problem finding the Profile.");
                if (!profile) return res.status(404).send("No Profile found for this username");
                return res.status(200).send(profile);
            }); }
        if ( user.role === "guest" ){
            GuestProfile.findOne({"username":target}, {name:1,picture:1}, function (err, profile) {
                if (err) return res.status(500).send("There was a problem finding the Profile.");
                if (!profile) return res.status(404).send("No Profile found for this username");
                return res.status(200).send(profile);
            }); }

        //return res.status(200).send(user.email);
    });
});

module.exports = router;
