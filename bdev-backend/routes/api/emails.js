const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

var Mailgun = require('mailgun-js');

//Your api key, from Mailgun’s Control Panel
var api_key = keys.mailgunAPI;
//Your domain, from the Mailgun Control Panel
var domain = 'mg.breakingdev.pt';
//Your sending email address
var from_who = 'no-reply@breakingdev.pt';

// Load User model
//const User = require("../../models/User");

// Load input validation
//const validateDevProfileInput = require("../../validation/devProfile");

// @route POST api/devs/create
// @desc Create Dev Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'starter'
router.post("/test", verifyToken, (req, res) => {

    console.log("here");
    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var data = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: "tjacobmartins@gmail.com",//req.params.mail,
        //Subject and text data
        subject: 'Hello from Mailgun',
        html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS!'
    }
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(data, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            //res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            //res.render('submitted', { email : req.params.mail });
            console.log(body);
        }
    });

});


module.exports = router;

