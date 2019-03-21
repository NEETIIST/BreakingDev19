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
        type: String,
        required: true,
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
    payment: {
        type: Boolean,
        required: true,
        default: false,
    },

});
module.exports = DevProfile = mongoose.model("devProfiles", DevProfileSchema);
