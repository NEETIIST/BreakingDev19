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
const validateContactRequest = require("../../validation/beSponsor");

// @route POST api/emails/besponsor
// @desc Create Dev Profile, logged user must not have a profile already
// Performs a double check for already existing profiles associated with this username
// And checks for role permission, must be 'starter'
router.post("/besponsor", (req, res) => {

    console.log("Content:");
    console.log(req.body.name);
    console.log(req.body.company);
    console.log(req.body.phone);
    console.log(req.body.email);

    // Form validation
    const { errors, isValid } = validateContactRequest(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var confirmationMail = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: req.body.email,
        //Subject and text data
        subject: '[BreakingDev] Pedido de Informação',
        html: 'Caro/a '+req.body.name+'.<br><br>Obrigado pelo seu contacto. Serve este e-mail automático para confirmar que recebemos o seu pedido de contacto. Espere uma resposta nossa muito brevemente.<br><br>Organização do BreakingDev'
    }
    var informationMail = {
        //Specify email data
        from: from_who,
        //The email to contact
        to: 'neeti.isttagus@gmail.com',
        //Subject and text data
        subject: '[BreakingDev] Pedido de Informação da empresa '+req.body.company,
        html: 'A empresa '+req.body.company+', através do Sr./Sra. '+req.body.name+' pediu mais informações sobre o BreakingDev.<br><br>O número de telefone é: '+req.body.phone+'<br><br>O email fornecido é: '+req.body.email+'<br><br>Enviado automaticamente pelo site.'
    }
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(confirmationMail, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            //res.render('error', { error : err});
            console.log("got an error: ", err);
            return res.status(500).send("There was a problem sending your email, please try again");
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            //res.render('submitted', { email : req.params.mail });
            console.log(body);
            return res.status(200).send("Email sent successfully");
        }
    });
    mailgun.messages().send(informationMail, function (err, body) {
        //If there is an error, render the error page
        if (err) {
            //res.render('error', { error : err});
            console.log("got an error: ", err);
            //return res.status(500).send("There was a problem sending your email, please try again");
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page
            //We pass the variable "email" from the url parameter in an object rendered by Jade
            //res.render('submitted', { email : req.params.mail });
            console.log("Email sent successfully");
            //return res.status(200).send("Email sent successfuly");
        }
    });

});


module.exports = router;

