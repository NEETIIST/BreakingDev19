const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load Data Models
const Team = require("../../models/Team");
const DevProfile = require("../../models/DevProfile");

// Load input validation
const validateTeamInput = require("../../validation/teams");

// @route GET api/teams/all
// @desc Returns all teams
// @permission Staff Only
router.get("/all", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    Team.find({}, function (err, teams) {
        if (err) return res.status(500).send("There was a problem finding the Teams");
        if (!teams) return res.status(404).send("No Teams found");

        return res.status(200).send(teams);
    });

});

// @route GET api/teams/active
// @desc Returns active teams (not disbanded)
// @permission Logged Users
router.get("/active", verifyToken, (req, res) => {

    let info = Team.publicInfo;
    if ( req.role === "staff" ) info = Team.adminInfo;

    Team.find({"disbanded":false}, info, function (err, teams) {
        if (err) return res.status(500).send("There was a problem finding the Teams");
        if (!teams) return res.status(404).send("No Teams found");

        return res.status(200).send(teams);
    });

});


// @route POST api/teams/create
// @desc Create a Team
// @permission Logged Users with a VALIDATED Dev Profile and Without a team
router.post("/create", verifyToken, (req, res) => {

    if ( req.role !== "dev" ){ return res.status(403).send("Only Devs can create Teams"); }

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile to create a Team.");
        if (!dev) return res.status(404).send("No Dev Profiles was found for this user.");

        if ( !dev.validated ) return res.status(403).send("Only Validated Devs can create Teams");
        if ( dev.team !== 0 ) return res.status(403).send("User already has a Team");

        // Form validation
        const { errors, isValid } = validateTeamInput(req.body);
        // Check validation
        if (!isValid) { return res.status(400).json(errors); }

        var crypto = require("crypto");
        var password = crypto.randomBytes(3).toString('hex');

        const newTeam = new Team({
            //number: "",
            team_name: req.body.team_name,
            category: req.body.category,
            proj_name: req.body.proj_name,
            proj_desc: req.body.proj_desc,
            captain: req.username,
            members: [],
            wants_members: req.body.wants_members,
            skills: req.body.skills,
            website: req.body.website,
            password: password,
            pending: false,
            validated: false,
            registration: null,
            disbanded: false,
        });

        newTeam
            .save()
            .then(team => {
                console.log("Sucessfully created a Team, with the captain: " + team.captain);
                // Update Dev Profile With the New Team Number, if all is sucessfull, sends team
                dev .update({team:team.number})
                    .then(dev => { return res.status(200).send(team); })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

    });


});

/* TODO Routes:
    - Edit Team
    - Disband Team
    - Request Validation
    - Validate Team
    - Add Member
    - Remove Member
    - Reset Password (?)

*/


module.exports = router;

