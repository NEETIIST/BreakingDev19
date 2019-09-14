const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');

// Load Models
const PromoCode = require("../../models/PromoCode");
const DevProfile = require("../../models/DevProfile");

// Load input validation
const validatePromoCodeSubmission = require("../../validation/promocode");

// @route GET api/promocodes/all
// @desc Returns all promocodes
// @permissions Staff Only
router.get("/all", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    PromoCode.find({}, function (err, codes) {
        if (err) return res.status(500).send("There was a problem finding the Promocodes.");
        if (!codes) return res.status(404).send("No promocodes found");

        return res.status(200).send(codes);
    });

});


// @route POST api/promocodes/add
// @desc Create new Promocode
// @permissions Staff Only
router.post("/add", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    PromoCode.findOne({code:req.body.code}, function (err, code) {
        if (err) return res.status(500).send("There was a problem creating the Promocode");
        if (code) return res.status(404).send("This code already exists");

        // Fields Validation
        const { errors, isValid } = validatePromoCodeSubmission(req.body);
        if (!isValid) { return res.status(400).json(errors); }

        let teamCode = (req.body.teamCode === 'true');
        let usesRemaining; teamCode ? usesRemaining=4 : usesRemaining=1;
        const newCode = new PromoCode({
            code: req.body.code.toUpperCase(),
            value: req.body.value,
            teamCode: req.body.teamCode,
            usesRemaining: usesRemaining,
            users: [],
            teamUsed: "",
        });

        newCode
            .save()
            .then(code => { return res.status(200).send(code); })
            .catch(err => console.log(err));
    });

});


// @route PUT api/promocodes/_:code/disable
// @desc Disables a Code, turning it's remaining uses to zero
// @permissions Staffs Only
router.put("/_:code/disable", verifyToken, (req, res) => {

    // Only Staffs can perform this
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    PromoCode.findOneAndUpdate({"code":req.params['code']}, {usesRemaining:0}, {new: true}, function (err, code) {
        if (err) return res.status(500).send("There was a problem finding the code");
        if (!code) return res.status(404).send("No Code Found");

        return res.status(200).send(code);
    });

});


// @route POST api/promocodes/_:code/use
// @desc Associates the
// @permissions Only Validated Devs can use the promo code
router.post("/_:code/use", verifyToken, (req, res) => {

    console.log(req.role);
    // Only Devs can perform this
    if ( req.role !== 'dev' ){ return res.status(403).send("You don't have permission for this action"); }

    DevProfile.findOne({"username":req.username}, function (err, dev) {
        if (err) return res.status(500).send("There was a problem finding the user");
        if (!dev) return res.status(404).send("No Dev Profile was found for the user");

        if ( !dev.validated ) return res.status(403).send("Only Validated Devs can use promocodes.");
        if ( dev.team === 0 ) return res.status(403).send("Only Users in Teams can use promocodes.");

        if ( dev.payment.promocode !== "" ) return res.status(403).send("Already used a promocode");

        PromoCode.findOne({"code":(req.params['code']).toUpperCase()}, function (err, code) {
            if (err) return res.status(500).send("somethingwrong");
            if (!code) return res.status(404).send("nocode");

            if ( code.usesRemaining === 0 ) return res.status(403).send("alreadyused");
            if ( code.teamUsed !== "" )
                if ( code.teamUsed != dev.team )
                    return res.status(403).send("assignedteam");

            let updatedDev = dev;
            updatedDev.payment.promocode = code.code;
            // Price after code calculations here
            let price = keys.admissionPrice - code.value;
            (price < 0)?price=0:price;
            updatedDev.payment.price = price;

            if ( price===0 )
                updatedDev.payment.confirmed = true;

            dev .save(updatedDev)
                .then(dev => { })
                .catch(err => console.log(err));

            let updatedCode = code;
            updatedCode.usesRemaining = code.usesRemaining -1;
            if ( code.teamCode && code.teamUsed === "" )
                updatedCode.teamUsed = dev.team;
            updatedCode.users.push(dev.username);

            code.save(updatedCode)
                .then(code => { })
                .catch(err => console.log(err));

            return res.status(200).send(updatedDev.payment);
        });


        //return res.status(200).send(code);
    });


});


module.exports = router;

