const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    highlighted: {
        type: Boolean,
        required: true,
        default: false
    },
    claimed: {
        type: Boolean,
        required: true,
        default: false
    },
    hidden: {
        type: Boolean,
        required: true,
        default: false
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    },

});
module.exports = Idea = mongoose.model("idea", IdeaSchema);


Idea.publicInfo = {
    number:1,
    title:1,
    name:1,
    //claimed:1,
    description:1,
    highlighted:1,
    date:1,
};
