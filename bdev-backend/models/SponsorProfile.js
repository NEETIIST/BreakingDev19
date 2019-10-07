const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SponsorProfileSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    github: {
        type: String,
    },
    twitter: {
        type: String,
    },
    linkedin: {
        type: String,
    },
    picture: {
        type: String,
    },


});

SponsorProfile = mongoose.model("sponsorProfiles", SponsorProfileSchema);

SponsorProfile.publicInfo = {
    username:1,
    name:1,
    company:1,
    bio:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
};

SponsorProfile.allowEdit = {
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    motivation:1,
    skills:1,
    food:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    cv:1,
    availability:1,
};

SponsorProfile.ownerInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    motivation:1,
    skills:1,
    food:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    cv:1,
    pending: 1,
    validated:1,
    availability:1,
    shifts:1,
};

SponsorProfile.adminInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    motivation:1,
    skills:1,
    food:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    cv:1,
    pending: 1,
    validated:1,
    availability:1,
    shifts:1,
};

module.exports = SponsorProfile;
