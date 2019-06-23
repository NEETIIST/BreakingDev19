const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateContactRequest(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.company = !isEmpty(data.company) ? data.company : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";

    // Name Checks - Must be filled
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is necessary";
    }
    else if (!Validator.isLength(data.title,{min:0, max: 128})) {
        errors.name = "Should be shorter than 128 characters";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Company Checks - Must be filled
    if (Validator.isEmpty(data.company)) {
        errors.company = "Company name is necessary";
    }
    else if (!Validator.isLength(data.title,{min:0, max: 256})) {
        errors.company = "Should be shorter than 256 characters";
    }
    // Phone checks
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone field is required";
    } else if (!Validator.isMobilePhone(data.phone)) {
        errors.phone = "Phone is invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
