const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        immutable: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        required: true,
        allowedValues: ["dev","volunteer","staff","sponsor"],
    },

});
module.exports = User = mongoose.model("users", UserSchema);
