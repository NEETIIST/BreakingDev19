const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const GuestProfileSchema = new Schema({
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

GuestProfile = mongoose.model("guestProfiles", GuestProfileSchema);

GuestProfile.publicInfo = {
    username:1,
    name:1,
    //age:1,
    //phone: 1,
    college:1,
    course:1,
    bio:1,
    skills:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    //cv:1,
};

GuestProfile.ownerInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    skills:1,
    github:1,
    twitter:1,
    linkedin:1,
    picture:1,
    cv:1,
};

module.exports = GuestProfile;
