const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateAdminProfileInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.college = !isEmpty(data.college) ? data.college : "";
    data.course = !isEmpty(data.course) ? data.course : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.bio = !isEmpty(data.bio) ? data.bio : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.github = !isEmpty(data.github) ? data.github : "";
    data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
    data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";

    // Name Checks - Must be filled
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is necessary";
    }
    // Age checks - Must be filled and number greater than 17
    if (Validator.isEmpty(data.age)) {
        errors.age = "Age is required";
    } else if (! Validator.isInt(data.age, {gt:17, lt:100, allow_leading_zeroes: false}) ) {
        errors.age = "Age must be over 17";
    }
    // College Checks - Must be filled
    if (Validator.isEmpty(data.college)) {
        errors.college = "College is required";
    }
    // Course Checks - Must be filled
    if (Validator.isEmpty(data.course)) {
        errors.course = "Course is necessary";
    }
    // Phone number checks - Must be filled and portuguese phone number
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone is required";
    } else if (! Validator.isMobilePhone(data.phone, 'pt-PT') ) {
        errors.phone = "Please use a valid portuguese phone number";
    }
    // Bio is not checked because it can be empty
    // Skills Checks - Must be filled
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Provide some skills";
    }
    // Github Checks - If provided, must be url
    if ( (!Validator.isEmpty(data.github)) && (!Validator.isURL(data.github))) {
        errors.github = "Provide a valid url to your github profile";
    }
    // Twitter Checks - If provided, must be url
    if ( (!Validator.isEmpty(data.twitter)) && (!Validator.isURL(data.twitter))) {
        errors.twitter = "Provide a valid url to your twitter profile";
    }
    // Linkedin Checks - If provided, must be url
    if ( (!Validator.isEmpty(data.linkedin)) && (!Validator.isURL(data.linkedin))) {
        errors.linkedin = "Provide a valid url to your Linkedin profile";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
