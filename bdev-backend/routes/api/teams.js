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


// @route GET api/teams/wantsmembers
// @desc Returns teams looking for members to join
// @permission Logged Users
router.get("/wantsmembers", verifyToken, (req, res) => {

    let info = Team.publicInfo;
    //if ( req.role === "staff" ) info = Team.adminInfo;

    Team.find({"disbanded":false, "wants_members":true}, info, function (err, teams) {
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


// @route GET api/teams/own/
// @desc Get Own Team Info
// @permission Users that are enroled in a team ( captain or member )
router.get("/own", verifyToken, (req, res) => {

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile to create a Team.");
        if (!dev) return res.status(404).send("No Dev Profiles was found for this user.");
        if (dev.team === 0) return res.status(404).send("User hasn't joined a team");

        Team.findOne({"disbanded":false, $or:[{captain:req.username},{members:req.username}]}, Team.membersInfo, function (err, team) {
            if (err) return res.status(500).send("There was a problem finding the Team");
            if (!team) return res.status(404).send("No team was found for this user");

            return res.status(200).send(team);
        });
    });

});



// @route PUT api/teams/own/edit
// @desc Allows Editing the user own team
// @permission Only the team captain can edit
router.put("/own/edit", verifyToken, (req, res) => {

    // Form validation
    const { errors, isValid } = validateTeamInput(req.body);
    // Check validation
    if (!isValid) { return res.status(400).json(errors); }

    Team.findOne({"disbanded":false, captain: req.username }, Team.membersInfo, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No team was found with this user as captain");

        if ( team.validated ) return res.status(403).send("Team is already Validated");

        // Delete all fields in the request, except the ones that can be edited (prevents adding unverified fields)
        for ( field in req.body ){ if(Team.allowEdit[field] === undefined ) delete req.body[field]; }

        Object.assign(team, req.body );
        team.save()
            .then(team => { return res.status(200).send(team); })
            .catch(err => console.log(err));
    });

});



// @route GET api/teams/_:number
// @desc Returns Team Info by Number
// @permission Logged Users, ammount of info varies by role
router.get("/_:number", verifyToken, (req, res) => {

    let info = Team.publicInfo;
    if ( req.role === "staff" ) info = Team.adminInfo;

    Team.findOne({"disbanded":false, number:req.params['number'] }, info, function (err, team) {
        if (err) {console.log(err);return res.status(500).send("There was a problem finding the Team");}
        if (!team) return res.status(404).send("No Team found");

        return res.status(200).send(team);
    });

});

// @route PUT api/teams/_:number/join
// @desc Allows User to join a team
// @permission Every Validated User that is not on a team already can join
router.put("/_:number/join", verifyToken, (req, res) => {

    if ( req.role !== "dev" ){ return res.status(403).send("Only Devs can join Teams"); }

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev Profile to create a Team.");
        if (!dev) return res.status(404).send("No Dev Profiles was found for this user.");

        if ( !dev.validated ) return res.status(403).send("Only Validated Devs can join Teams");
        if ( dev.team !== 0 ) return res.status(403).send("User already is on a Team");

        Team.findOne({"disbanded":false, number:parseInt(req.params['number'])}, Team.membersInfo, function (err, team) {
            if (err) return res.status(500).send("There was a problem finding the Team");
            if (!team) return res.status(404).send("No active team was found for this number");

            if ( team.members.length >= 3) return res.status(403).send("Team is already full");
            if ( team.validated ) return res.status(403).send("Team is already Validated");
            if ( req.body.password !== team.password ) return res.status(403).send("Wrong Password");

            team.members.push(req.username);

            team.save()
                .then( team => {
                    Object.assign(dev, { team: team.number });
                    dev .save()
                        .then(dev => { return res.status(200).send(team); })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
        });

    });

});

// @route GET api/teams/own/members
// @desc Get Dev Profiles of the Team Members
// @permission The user gets the profiles of it's own team members
router.get("/own/members", verifyToken, (req, res) => {

    Team.findOne({"disbanded":false, $or:[{captain:req.username},{members:req.username}]}, Team.membersInfo, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No team was found for this user");

        DevProfile.find({$or:[{"username":team.captain},{"username":{ $in: team.members }}]}, DevProfile.publicInfo, function (err, devs) {
            if (err) {console.log(err);return res.status(500).send("There was a problem finding the Dev Profile of this team.")};
            if (!devs) return res.status(404).send("No Dev Profile was found for this team user's");

            return res.status(200).send(devs);
        });
    });



});


// @route PUT api/teams/own/remove/_username
// @desc Removes Member From Team
// @permission Only the Team Captain can remove other members
router.put("/own/remove/_:username", verifyToken, (req, res) => {

    Team.findOne({"disbanded":false, captain:req.username}, Team.membersInfo, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No active team was found with this user as captain");

        if ( team.validated ) return res.status(403).send("Team is already Validated.");

        targetUser = req.params['username'];

        let newMembers = team.members;
        let index = newMembers.indexOf(targetUser);
        if (index !== -1) { newMembers.splice(index, 1);}
        else return res.status(404).send("No user on your team has the requested username");

        team.save()
            .then( team => {
                DevProfile.findOneAndUpdate({"username":targetUser}, {team:0}, function (err, dev) {
                    if (err) return res.status(500).send("There was a problem finding the Dev Profile to remove him from the Team.");
                    if (!dev) return res.status(404).send("No Dev Profile was found for this user.");

                    return res.status(200).send(team);
                });
            })
            .catch(err => console.log(err));
    });

});


// @route PUT api/teams/own/disband
// @desc Disbands Team
// @permission Only the Team Captain can disband the team, after removing every member
router.put("/own/disband", verifyToken, (req, res) => {

    Team.findOne({"disbanded":false, captain:req.username}, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No active team was found with this user as captain");

        if ( team.validated ) return res.status(403).send("Team is already Validated.");
        if (team.members.length !== 0) return res.status(403).send("You must remove every member before disbanding the team");

        DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile to remove him from the Team.");
            if (!dev) return res.status(404).send("No Dev Profile was found for this user.");

            team.disbanded = true;
            team.save()
                .then( team => {
                    dev.team = 0;
                    dev .save()
                        .then(dev => { return res.status(200).send(dev); })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));

        });


    });

});


// @route PUT api/teams/own/leave
// @desc Dev leaves the team
// @permission Only Devs on a team can leave it
router.put("/own/leave", verifyToken, (req, res) => {

    Team.findOne({"disbanded":false, members:req.username}, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No active team was found with this user as a member");

        if ( team.validated ) return res.status(403).send("Team is already Validated.");

        DevProfile.findOne({"username":req.username}, DevProfile.ownerInfo, function (err, dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev Profile to remove him from the Team.");
            if (!dev) return res.status(404).send("No Dev Profile was found for this user.");

            team.members.splice(team.members.indexOf(req.username), 1);
            team.save()
                .then( team => {
                    dev.team = 0;
                    dev .save()
                        .then(dev => { return res.status(200).send(dev); })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));

        });

    });
});


// @route PUT api/teams/own/validate
// @desc Request validation of the team
// @permission Only the team Captain can request validation
router.put("/own/validate", verifyToken, (req, res) => {

    Team.findOne({"disbanded":false, captain:req.username}, Team.membersInfo, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No active team was found with this user as captain");

        // Team must have at least captain and one more member
        if ( team.validated ) return res.status(403).send("Team is already Validated.");
        if ( team.members.length < 1 ) return res.status(403).send("Team needs at least two members.");

        team.pending = true;
        team.registration = new Date();
        team.save()
            .then( team => { return res.status(200).send(team); })
            .catch(err => console.log(err));
    });

});



// @route PUT api/teams/_:number/validate
// @desc Validates Team Enrollment
// @permission Only Staff can Validate Teams
router.put("/_:number/validate", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    Team.findOne({"disbanded":false, number:req.params['number']}, Team.adminInfo, function (err, team) {
        if (err) return res.status(500).send("There was a problem finding the Team");
        if (!team) return res.status(404).send("No active team was found with that number");

        team.pending = false;
        team.validated = true;
        team.save()
            .then( team => { return res.status(200).send(team); })
            .catch(err => console.log(err));
    });

});



/* TODO Routes:
    - Edit Team (DONE)
    - Add Member / Join Team (DONE)
    - Remove Member (DONE)
    - Leave and Disband Team (DONE)
    - Leave Team (DONE)
    - Request Validation (DONE)
    - Validate Team (DONE)
    - Reset Password (?)
    - Invite Members (?)
    - Check if team is validated on most methods (DONE)


*/


module.exports = router;

