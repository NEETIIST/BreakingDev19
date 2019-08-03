const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DevProfileSchema = new Schema({
    username: {
        type: String,
        required: true
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
    needsTeam:{
        type: Boolean,
        required: true,
    },
    hasTeam: {
        type: Boolean,
        required: true,
        default: false,
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
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },


});

DevProfile = mongoose.model("devProfiles", DevProfileSchema);

DevProfile.publicInfo = {
    username:1,
    name:1,
    //age:0,
    //phone: 0,
    college:1,
    course:1,
    bio:1,
    skills:1,
    //food:0,
    github:1,
    twitter:1,
    linkedin:1,
    hasTeam:1,
    needsTeam:1,
    //pending: 0,
    //validated:0,
    //payment:0,
};

DevProfile.ownerInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    skills:1,
    food:1,
    github:1,
    twitter:1,
    linkedin:1,
    hasTeam:1,
    needsTeam:1,
    pending: 1,
    validated:1,
    payment:1,
};

DevProfile.adminInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    skills:1,
    food:1,
    github:1,
    twitter:1,
    linkedin:1,
    hasTeam:1,
    needsTeam:1,
    pending: 1,
    validated:1,
    payment:1,
};

module.exports = DevProfile;
