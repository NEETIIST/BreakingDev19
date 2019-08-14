const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateTeamInput(data) {
    let errors = {};
    // Convert empty fields to an empty string so we can use validator functions
    data.team_name = !isEmpty(data.team_name) ? data.team_name : "";
    data.category = !isEmpty(data.category) ? data.category : "";
    data.proj_name = !isEmpty(data.proj_name) ? data.proj_name : "";
    data.proj_desc = !isEmpty(data.proj_desc) ? data.proj_desc : "";
    data.wants_members = !isEmpty(data.wants_members) ? data.wants_members : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";
    data.website = !isEmpty(data.website) ? data.website : "";

    // Team Name Checks - Must be filled and under 128 characters
    if (Validator.isEmpty(data.team_name)) {
        errors.team_name = "Team Name is necessary";
    }
    else if (!Validator.isLength(data.team_name,{max: 128})) {
        errors.team_name = "Team Name must have less than 128 characters";
    }
    // Category checks
    if (Validator.isEmpty(data.category)) {
        errors.category = "Category is required";
    }
    else if (!Validator.isIn(data.category, Team.schema.obj.category.allowedValues )){
        errors.category = "Invalid Category";
    }
    // Project Name Checks - Must be filled and under 256 characters
    if (Validator.isEmpty(data.proj_name)) {
        errors.proj_name = "Project Name is necessary";
    }
    else if (!Validator.isLength(data.proj_name,{max: 256})) {
        errors.proj_name = "Project Name must have less than 256 characters";
    }
    // Project Description Checks - Must be filled and under 128 characters
    if (Validator.isEmpty(data.proj_desc)) {
        errors.proj_desc = "Project Description is necessary";
    }
    else if (!Validator.isLength(data.proj_desc,{max: 1024})) {
        errors.proj_desc = "Project Name must have less than 1024 characters";
    }
    // Wants Members Check - Must be not empty boolean
    if (Validator.isEmpty(data.wants_members)) {
        errors.wants_members = "Wants Members is required";
    }
    else if (!Validator.isBoolean(data.wants_members)) {
        errors.wants_members = "Wants Members must be boolean";
    }
    // Website Check - If not empty, must be a website ( and under 256 characters )
    if ( (!Validator.isEmpty(data.website)) && (!Validator.isLength(data.website,{max: 256}))) {
        errors.website = "Website must have less than 256 characters";
    }
    else if ( (!Validator.isEmpty(data.website)) && (!Validator.isURL(data.website))) {
        errors.website = "Website must have be a valid URL";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

