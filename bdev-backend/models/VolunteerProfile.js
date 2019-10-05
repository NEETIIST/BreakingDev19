const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const VolunteerProfileSchema = new Schema({
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
    age: {
        type: Number,
        required: true
    },
    college: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    motivation: {
        type: String,
    },
    skills: {
        type: [String],
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
    food: {
        type: String,
    },
    picture: {
        type: String,
    },
    cv: {
        type: String,
    },
    pending: {
        type: Boolean,
        required: true,
        default: false,
    },
    validated: {
        type: Boolean,
        required: true,
        default: false,
    },



});

VolunteerProfile = mongoose.model("volunteerProfiles", VolunteerProfileSchema);

VolunteerProfile.publicInfo = {
    username:1,
    name:1,
    //age:0,
    //phone: 0,
    college:1,
    course:1,
    bio:1,
    //motivation:0,
    skills:1,
    //food:0,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    //cv:0,
    //pending: 0,
    //validated:0,
};

VolunteerProfile.ownerInfo = {
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
};

VolunteerProfile.adminInfo = {
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
};

module.exports = VolunteerProfile;
