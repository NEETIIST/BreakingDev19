const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminProfileSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true
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
    job: {
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
    picture: {
        type: String,
    },
    cv: {
        type: String,
    },

});

AdminProfile = mongoose.model("adminProfiles", AdminProfileSchema);

AdminProfile.publicInfo = {
    username: 1,
    name: 1,
    age: 0,
    college:1,
    course: 1,
    phone: 0,
    bio: 1,
    job: 1,
    skills: 1,
    github: 1,
    twitter: 1,
    linkedin: 1,
    picture: 0,
    cv: 0,
};

AdminProfile.adminInfo = {};

module.exports = AdminProfile;
