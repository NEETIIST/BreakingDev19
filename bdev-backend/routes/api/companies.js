const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const verifyToken = require('../../auth/tokenVerification');
var async = require('async');

// Load User model
const Company = require("../../models/Company");

// Load input validation
const validateCompanyInput = require("../../validation/company");

// Load Email Templates and Function
//const emails = require('../../emails');

// @route POST api/companies/create
// @desc Create Company
// Only staffs can create companies
router.post("/create", verifyToken, (req, res) => {

    if ( req.role !== 'staff' ){
        return res.status(403).send("You don't have permission for this action");
    }

    // If short name already exists, can't create another one
    Company.findOne({"short":req.body.short}, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the company");
        if (comp) return res.status(403).send("This name already exists");

        // Form validation
        const { errors, isValid } = validateCompanyInput(req.body);
        // Check validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const newCompany = new Company({
            name: req.body.name,
            short: req.body.short,
            members: [],
            codes: [],
        });

        newCompany
            .save()
            .then(comp => {
                return res.status(200).send(comp);
            })
            .catch(err => console.log(err));

    });

});

// @route GET api/companies/_:short
// @desc Returns the company by short name
// No permission check necessary, because only authorized users have their dev profile
router.get("/_:short", verifyToken, (req, res) => {

    // Regular users retrieve only the public information
    let fields = Company.publicInfo;

    // Admins retrieve all the information with this request
    if ( req.role === 'staff' ) fields = Company.adminInfo;

    Company.findOne({"short":req.params['short']}, fields, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the Company");
        if (!comp) return res.status(404).send("No company found for this name");

        return res.status(200).send(comp);
    });
});



// @route PUT api/companies/_:short/edit
// @desc Expects an updated Dev Profile form
// No permission check necessary, because only authorized users have their dev profile
// If user is validated or pending, some fields cannot be changed
router.put("/_:short/edit", verifyToken, (req, res) => {

    if ( !(req.role === 'staff' || req.role === "sponsor")){
        return res.status(403).send("You don't have permission for this action");
    }

    // Form validation
    const { errors, isValid } = validateCompanyInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Deleted Uneditable Fields and others
    for ( field in req.body ){ if(Company.editableFields[field] === undefined ) delete req.body[field]; }

    Company.findOne({"short":req.params['short']}, Company.memberInfo, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the company.");
        if (!comp) return res.status(404).send("No Company found for this name");

        Object.assign(comp, req.body);
        comp.save()
            .then(comp => { return res.status(200).send(comp); })
            .catch(err => console.log(err));

    });

});



// @route GET api/companies/all
// @desc Returns the company by short name
// No permission check necessary, because only authorized users have their dev profile
router.get("/all", verifyToken, (req, res) => {

    // Regular users retrieve only the public information
    let fields = Company.publicInfo;

    // Admins retrieve all the information with this request
    if ( req.role === 'staff' ) fields = Company.adminInfo;

    Company.find({}, fields, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the Company");
        if (!comp) return res.status(404).send("No company found for this name");

        return res.status(200).send(comp);
    });
});


// @route PUT api/companies/_:short/generate
// @desc Generate an access code
// @permissions Staffs Only
router.put("/_:short/generate", verifyToken, (req, res) => {

    // Only Staffs can approve other Devs
    if ( req.role !== 'staff' ){ return res.status(403).send("You don't have permission for this action"); }

    console.log("here");

    Company.findOne({"short":req.params['short']}, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the Company.");
        if (!comp) return res.status(404).send("No Company Profile found for this name");

        console.log(comp);

        var crypto = require("crypto");
        let newcode = crypto.randomBytes(3).toString('hex');

        console.log(comp);

        let codes = comp.codes;
        codes.push(newcode);
        comp.codes = codes;

        comp.save()
            .then(comp => { return res.status(200).send(comp); })
            .catch(err => console.log(err));

        return res.status(200).send(comp);
    });

});


// @route GET api/companies/own
// @desc Returns the company by short name
// No permission check necessary, because only authorized users have their dev profile
router.get("/own", verifyToken, (req, res) => {

    // Sponsors retrieve their information with this request
    if ( req.role !== 'sponsor' ){ return res.status(403).send("You don't have permission for this action"); }

    Company.findOne({"short":{ $regex: new RegExp("^" + req.username, "i") } }, Company.memberInfo, function (err, comp) {
        if (err) return res.status(500).send("There was a problem finding the Company");
        if (!comp) return res.status(404).send("No company found for this user");

        return res.status(200).send(comp);
    });
});



module.exports = router;
