const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePromoCodeSubmission(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.code = !isEmpty(data.code) ? data.code : "";
    data.value = !isEmpty(data.value) ? data.value : "";
    data.teamCode = !isEmpty(data.teamCode) ? data.teamCode : "";

    // Code Check - Must be Alphanumeric string with at least 5 characters and 12 max
    if (Validator.isEmpty(data.code)) {
        errors.title = "Code is necessary";
    }
    else if (!Validator.isLength(data.code,{min:5, max: 12})) {
        errors.title = "Should be larger than 5 and shorter than 12 characters";
    }
    else if (!Validator.isAlphanumeric(data.code, 'pt-PT')) {
        errors.title = "Should be alphanumeric characters only.";
    }
    // Value Checks - Must be not empty Number
    if (Validator.isEmpty(data.value)) {
        errors.title = "Value is necessary";
    }
    else if (!Validator.isInt(data.value, {min:0})) {
        errors.title = "Value must be a positive integer";
    }
    // teamCode Checks - Must be not empty Boolean
    if (Validator.isEmpty(data.teamCode)) {
        errors.title = "Team Code is necessary";
    }
    else if (!Validator.isBoolean(data.teamCode)) {
        errors.title = "Team Code must be a Boolean";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
