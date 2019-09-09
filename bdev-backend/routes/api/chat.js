const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load Chat model
const Chat = require("../../models/Chat");
const DevProfile = require("../../models/DevProfile");

// Load input validation
//const validateIdeaSubmission = require("../../validation/ideas");


// @route POST api/chat/create/
// @desc Creates a Chat Channel
// @permission Must be logged user
router.post("/create", verifyToken, (req, res) => {

    // Both Users must have a DevProfile
    // Request must contain the target username (target_username) and different from current user
    if ( req.username === req.body.target_username) return res.status(403).send("Sender and Receiver cannot be the same user.")
    // If channel with said user already exists, returns that channel
    // If no channel exists, creates a new one
    DevProfile.findOne({"username":req.username}, function (err, origin_dev) {
        if (err) return res.status(500).send("There was a problem finding the Dev");
        if (!origin_dev) return res.status(404).send("No Dev Profile was found for the username");

        DevProfile.findOne({"username":req.body.target_username}, function (err, target_dev) {
            if (err) return res.status(500).send("There was a problem finding the Dev");
            if (!target_dev) return res.status(404).send("No Dev Profile was found for the requested username");

            Chat.findOne({ "members": { "$size" : 2, "$all": [ req.username, req.body.target_username ] }  }, function (err, channel) {
                if (err) return res.status(500).send("There was a problem finding the Chat Channel");
                if (channel) return res.status(200).send(channel);

                var crypto = require("crypto");
                var socket = crypto.randomBytes(3).toString('hex');

                const newChannel = new Chat({
                    //number: "",
                    socket_id: socket,
                    members: [origin_dev.username, target_dev.username],
                    messages: [
                        {author:origin_dev.username,
                        content:"Esta conversa foi iniciada por mim. (gerado automáticamente)"}
                    ],
                });

                newChannel
                    .save()
                    .then(chat => { return res.status(200).send(chat);
                        /*
                        console.log("Sucessfully created a Team, with the captain: " + team.captain);
                        // Update Dev Profile With the New Team Number, if all is sucessfull, sends team
                        dev .update({team:team.number})
                            .then(dev => { return res.status(200).send(team); })
                            .catch(err => console.log(err));

                        */
                    })
                    .catch(err => console.log(err));
            });

        });
    });

});


// @route GET api/chat/own
// @desc Returns Users Channel
// @permission Logged User must belong to the channel
router.get("/own", verifyToken, (req, res) => {

    Chat.find({"members":{ $in: [req.username] }}, function (err, chats) {
        if (err) return res.status(500).send("There was a problem finding the Chats.");
        if (!chats) return res.status(404).send("No Chats found");

        return res.status(200).send(chats);
    });

});


// @route GET api/chat/_:channel
// @desc Returns Channel Information
// @permission Logged User must belong to the channel
router.get("/_:channel", verifyToken, (req, res) => {

    Chat.findOne({$and:[{"members":{ $in: [req.username] }},{"channel":req.params['channel']}]}, function (err, chat) {
        if (err) return res.status(500).send("There was a problem finding the Chats.");
        if (!chat) return res.status(404).send("No Chats found");

        return res.status(200).send(chat);
    });

});


// @route GET api/chat/_:channel/send
// @desc Send message to Channel
// @permission Logged User must belong to the target channel
router.put("/_:channel/send", verifyToken, (req, res) => {

    Chat.findOneAndUpdate(
        {$and:[{"members":{ $in: [req.username] }},{"channel":req.params['channel']}]},
        {$push: { "messages": {content:req.body.message, author: req.username} } },
        {new: true},
        function (err, chat) {
            if (err) return res.status(500).send("There was a problem finding the Chats.");
            if (!chat) return res.status(404).send("No Chats found");
            req.app.get('io').to(chat.socket_id).emit('has_messages');
            return res.status(200).send(chat);
        }
    );



});





module.exports = router;

