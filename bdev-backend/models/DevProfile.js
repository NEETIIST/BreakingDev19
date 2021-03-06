const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const DevProfileSchema = new Schema({
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
    food: {
        type: String,
    },
    needsTeam:{
        type: Boolean,
        required: true,
    },
    picture: {
        type: String,
    },
    cv: {
        type: String,
    },
    team: {
        type: Number,
        required: true,
        default: 0, // If 0, user doesnt have a team
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
    /*
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },
    paymentFile: {
        type: String,
    },
    */
    payment:{
        //required: true,
        confirmed: { type: Boolean },
        promocode: { type: String },
        price: { type: Number },
        file: { type: String },
    }


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
    team:1,
    needsTeam:1,
    picture:1,
    //cv:0,
    //pending: 0,
    //validated:0,
    //payment:0,
    //paymentFile:0,
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
    team:1,
    needsTeam:1,
    picture:1,
    cv:1,
    pending: 1,
    validated:1,
    payment:1,
    //paymentFile:1,
};

DevProfile.sponsorInfo = {
    username:1,
    name:1,
    age:1,
    phone: 1,
    college:1,
    course:1,
    bio:1,
    skills:1,
    //food:1,
    github:1,
    twitter:1,
    linkedin:1,
    team:1,
    //needsTeam:1,
    picture:1,
    cv:1,
    //pending: 1,
    validated:1,
    //payment:1,
    //paymentFile:1,
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
    team:1,
    needsTeam:1,
    picture:1,
    cv:1,
    pending: 1,
    validated:1,
    payment:1,
    //paymentFile:1,
};

module.exports = DevProfile;
