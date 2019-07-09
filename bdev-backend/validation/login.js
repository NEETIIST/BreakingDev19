const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    // Email checks
    /*
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    */
    // Username checks
    if (Validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    } else if (!Validator.isLength(data.username, { min: 5, max: 30 })) {
        errors.username = "Username must have at least 5 characters";
    }  else if (!Validator.isAlphanumeric(data.username, 'pt-PT')) {  // Check if it makes sense to use accents
        errors.username = "Username must have only numbers and letters please";
    }
    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else if (!Validator.isLength(data.password, { min: 6, max: 128 })) {
        errors.password = "Password must be at least 6 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
