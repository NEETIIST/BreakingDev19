const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PromoCodeSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: Number,
        required: true
    },
    usesRemaining: {
        type: Number,
        required: true
    },
    users: {
        type: [String],
    },
    teamCode: {
        type: Boolean,
        required: true,
    },
    teamUsed: {
        type: String,
    },
});
module.exports = PromoCode = mongoose.model("promocodes", PromoCodeSchema);


PromoCode.adminInfo = {
    code:1,
    value:1,
    usesRemaining:1,
    users:1,
    teamCode:1,
    teamUsed:1,
};
