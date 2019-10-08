const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load Models
const Ticket = require("../../models/Ticket");
const User = require("../../models/User");

// @route GET api/tickets/all
// @desc Returns all Tickets
// @permissions Staff Only
router.get("/all", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    Ticket.find({}, function (err, tickets) {
        if (err) return res.status(500).send("There was a problem finding the Tickets.");
        if (!tickets) return res.status(404).send("No Tickets found");

        return res.status(200).send(tickets);
    });

});

// @route GET api/tickets/:raffle
// @desc Returns tickets for a single raffle
// @permissions Staff Only
router.get("/:raffle", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    Ticket.find({"raffle":req.params["raffle"]}, function (err, tickets) {
        if (err) return res.status(500).send("There was a problem finding the Tickets.");
        if (!tickets) return res.status(404).send("No Tickets found");

        return res.status(200).send(tickets);
    });

});


// @route POST api/tickets/add
// @desc Create new Tickets
// @permissions Staff Only
router.post("/add", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    // Validation
    if (!Ticket.schema.obj.raffle.allowedValues.includes(req.body.raffle))
        return res.status(403).json("Invalid Raffle");

    User.findOne({"username":req.body.username}, function (err, user) {
        if (err) return res.status(500).json("There was a problem finding the user.");
        if (!user) return res.status(404).json("No user found for this username");

        const newTicket = new Ticket({
            //number: ??
            username: user.username,
            raffle: req.body.raffle,
            description: req.body.description,
        });

        newTicket
            .save()
            .then(ticket => { return res.status(200).send(ticket); })
            .catch(err => console.log(err));

    });

});

module.exports = router;
