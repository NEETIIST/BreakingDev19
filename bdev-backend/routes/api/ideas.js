const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load User model
const Idea = require("../../models/Idea");

// Load input validation
const validateIdeaSubmission = require("../../validation/ideas");

// @route GET api/ideas/public
// @desc Returns all public ideas (not hidden)
// No permission or auth required
router.get("/public", (req, res) => {

    Idea.find({"hidden":false}, Idea.publicInfo, function (err, ideas) {
        if (err) return res.status(500).send("There was a problem finding the Ideas.");
        if (!ideas) return res.status(404).send("No ideas found");

        return res.status(200).send(ideas);
    });

});

// @route GET api/ideas/all
// @desc Returns all ideas
// Requires admin access
router.get("/all", verifyToken, (req, res) => {

    if ( req.role != 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.find({}, function (err, ideas) {
        if (err) return res.status(500).send("There was a problem finding the Ideas.");
        if (!ideas) return res.status(404).send("No ideas found");

        return res.status(200).send(ideas);
    });

});

// @route POST api/ideas/add
// @desc Add an idea to the idea bank
// No permission or auth required
router.post("/add", (req, res) => {

    Idea.find(function (err, ideas) {
        if (err) return res.status(500).send("There was a problem finding the Ideas");

        // Form validation
        const { errors, isValid } = validateIdeaSubmission(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        var ideasCount = ideas.length;

        const newIdea = new Idea({
            number: ideasCount+1,
            title: req.body.title,
            name: req.body.name,
            email: req.body.email,
            description: req.body.description
        });

        newIdea
            .save()
            .then(idea => { return res.status(200).send("Idea added succesfully") })
            .catch(err => { return res.status(500).send("Something went wrong, please try again. Err: "+err) });

    });
});

// @route POST api/ideas/hide/:number
// @desc Hides the Idea matching the number
// Action for admins only
router.post("/hide/:number", verifyToken, (req, res) => {

    console.log("THIS!");
    console.log(req);
    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"hidden":true}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });
});


// @route POST api/ideas/show/:number
// @desc Displays the Idea matching the number
// Action for admins only
router.post("/show/:number", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"hidden":false}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });

});

// @route POST api/ideas/approve/:number
// @desc "Confirms" the idea by the admins
// Action for admins only
router.post("/approve/:number", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"approved":true}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });
});

// @route POST api/ideas/disapprove/:number
// @desc "UnConfirms" the idea by the admins
// Action for admins only
router.post("/disapprove/:number", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"approved":false}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });
});

// @route POST api/ideas/favorite/:number
// @desc Highlights the idea on the bank page
// Action for admins only
router.post("/favorite/:number", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"highlighted":true}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });
});

// @route POST api/ideas/unfavorite/:number
// @desc Unhighlights the idea on the bank page
// Action for admins only
router.post("/unfavorite/:number", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ) return res.status(403).send("You don't have permission for this action");;

    Idea.findOneAndUpdate({"number":req.params["number"]}, {"highlighted":false}, function (err, idea) {
        if (err) return res.status(500).send("There was a problem finding the Idea.");
        return res.status(200).send("Updated Successfully");
    });
});


module.exports = router;

