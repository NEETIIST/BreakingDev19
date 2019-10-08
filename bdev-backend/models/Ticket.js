const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Create Schema
const TicketSchema = new Schema({
    identifier: {
        type: Number,
        //required: true,
        immutable: true,
        //unique: true,
    },
    raffle: {
        type: String,
        required: true,
        immutable:true,
        allowedValues: ["job_fair","event_award"],
    },
    username: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },

});

TicketSchema.plugin(AutoIncrement, {inc_field: 'identifier'});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);
