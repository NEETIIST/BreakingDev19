const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateIdeaSubmission(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.title = !isEmpty(data.title) ? data.title : "";
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.description = !isEmpty(data.description) ? data.description : "";

    // Title Checks - Must be filled and shorter than 128 characters
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is necessary";
    }
    if (!Validator.isLength(data.title,{min:0, max: 128})) {
        errors.title = "Should be shorter than 128 characters";
    }
    // Name Checks - Must be filled and shorter than 128 characters
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is necessary";
    }
    if (!Validator.isLength(data.title,{min:0, max: 128})) {
        errors.title = "Should be shorter than 128 characters";
    }
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    // Description Checks - Must be filled
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description is necessary";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
