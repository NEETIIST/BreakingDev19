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
});

SponsorProfile = mongoose.model("sponsorProfiles", SponsorProfileSchema);

module.exports = SponsorProfile;
