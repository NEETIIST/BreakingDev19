const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateCompanyInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.short = !isEmpty(data.short) ? data.short : "";
    data.job = !isEmpty(data.job) ? data.job : "";
    data.search = !isEmpty(data.search) ? data.search : "";
    data.website = !isEmpty(data.website) ? data.website : "";

    // Name Checks - Must be filled
    if ( (!Validator.isEmpty(data.name)) && (!Validator.isLength(data.name,{max: 512}))) {
        errors.food = "Please use less than 512 characters";
    }
    // Short Checks - Must be filled
    if ( (!Validator.isEmpty(data.short)) && (!Validator.isLength(data.short,{max: 512}))) {
        errors.food = "Please use less than 512 characters";
    }
    // Job Checks - Must be filled
    if ( (!Validator.isEmpty(data.job)) && (!Validator.isLength(data.job,{max: 2048}))) {
        errors.food = "Please use less than 2048 characters";
    }
    // Search Checks - Must be filled
    if ( (!Validator.isEmpty(data.search)) && (!Validator.isLength(data.search,{max: 2048}))) {
        errors.food = "Please use less than 2048 characters";
    }
    // website Checks - Must be filled
    if ( (!Validator.isEmpty(data.website)) && (!Validator.isLength(data.website,{max: 2048}))) {
        errors.food = "Please use less than 2048 characters";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

