const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateDevProfileInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.age = !isEmpty(data.age) ? data.age : "";
    data.college = !isEmpty(data.college) ? data.college : "";
    data.course = !isEmpty(data.course) ? data.course : "";
    data.phone = !isEmpty(data.phone) ? data.phone : "";
    data.bio = !isEmpty(data.bio) ? data.bio : "";
    data.food = !isEmpty(data.food) ? data.food : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.github = !isEmpty(data.github) ? data.github : "";
    data.twitter = !isEmpty(data.twitter) ? data.twitter : "";
    data.linkedin = !isEmpty(data.linkedin) ? data.linkedin : "";

    // Name Checks - Must be filled
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is necessary";
    }
    else if (!Validator.isLength(data.name,{max: 128})) {
        errors.name = "Name must have less than 128 characters";
    }
    // Age checks - Must be filled and number greater than 17
    if (Validator.isEmpty(data.age)) {
        errors.age = "Age is required";
    } else if (! Validator.isInt(data.age, {gt:17, lt:99, allow_leading_zeroes: false}) ) {
        errors.age = "Age must be over 17 and under 99";
    }
    // College Checks - Must be filled
    if (Validator.isEmpty(data.college)) {
        errors.college = "College is required";
    }
    else if (!Validator.isLength(data.college,{max: 256})) {
        errors.name = "Name must have less than 256 characters";
    }
    // Course Checks - Must be filled
    if (Validator.isEmpty(data.course)) {
        errors.course = "Course is necessary";
    }
    else if (!Validator.isLength(data.course,{max: 256})) {
        errors.name = "Name must have less than 256 characters";
    }
    // Phone number checks - Must be filled and portuguese phone number
    if (Validator.isEmpty(data.phone)) {
        errors.phone = "Phone is required";
    } else if (! Validator.isMobilePhone(data.phone, 'pt-PT') ) {
        errors.phone = "Please use a valid Portuguese phone number";
    }
    // Bio Checks - Must be smaller than
    if ( (!Validator.isEmpty(data.bio)) && (!Validator.isLength(data.bio,{max: 512}))) {
        errors.bio = "Please use less than 1024 characters";
    }
    // Food Checks - Must be filled
    if ( (!Validator.isEmpty(data.food)) && (!Validator.isLength(data.food,{max: 512}))) {
        errors.food = "Please use less than 512 characters";
    }
    // Skills Checks - Must be filled
    /*
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "Provide some skills";
    }
    */
    // Needs Team Check - Must be not empty boolean
    if (Validator.isEmpty(data.needsTeam)) {
        errors.needsTeam = "Needs Team is required";
    }
    else if (!Validator.isBoolean(data.needsTeam)) {
        errors.needsTeam = "Needs Team must be boolean";
    }
    // Github Checks - If provided, must be smaller than 256
    if ( (!Validator.isEmpty(data.github)) && (!Validator.isLength(data.github,{max: 256}))) {
        errors.github = "Username must have less than 256 characters";
    }
    // Twitter Checks - If provided, must be url
    if ( (!Validator.isEmpty(data.twitter)) && (!Validator.isLength(data.twitter,{max: 256}))) {
        errors.twitter = "Username must have less than 256 characters";
    }
    // Linkedin Checks - If provided, must be url
    if ( (!Validator.isEmpty(data.linkedin)) && (!Validator.isLength(data.linkedin,{max: 256}))) {
        errors.linkedin = "Username must have less than 256 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};

