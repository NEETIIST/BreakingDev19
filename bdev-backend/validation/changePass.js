const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePassInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions

    //data.username = !isEmpty(data.username) ? data.username : "";
    data.old_password = !isEmpty(data.old_password) ? data.old_password : "";
    data.new_password = !isEmpty(data.new_password) ? data.new_password : "";
    data.new_password_confirmation = !isEmpty(data.new_password_confirmation) ? data.new_password_confirmation : "";

    // Password checks
    if (Validator.isEmpty(data.old_password)) {
        errors.password = "Password field is required";
    }
    if (Validator.isEmpty(data.new_password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.new_password, { min: 6, max: 128 })) {
        errors.password = "Password must be at least 6 characters";
    }
    if (Validator.isEmpty(data.new_password_confirmation)) {
        errors.password_confirmation = "Confirm password field is required";
    }
    if (!Validator.equals(data.new_password, data.new_password_confirmation)) {
        errors.password_confirmation = "New Passwords must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
