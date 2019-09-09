const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const ChatSchema = new Schema({
    channel: {
        type: Number,
        //required: true,
        unique: true,
    },
    socket_id: {
        type: String,
        required: true,
        unique: true,
    },
    members: {
        type: [String],
        required: true
    },
    // TODO: Messages should have the time they were sent
    messages: [{
        content: { type: String},
        author: { type: String},
    }],

});

ChatSchema.plugin(AutoIncrement, {inc_field: 'channel'});

module.exports = Chat = mongoose.model("chat", ChatSchema);

/*
Idea.publicInfo = {
    number:1,
    title:1,
    name:1,
    //claimed:1,
    description:1,
    highlighted:1,
    date:1,
    approved:1,
};
*/
