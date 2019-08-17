const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TeamSchema = new Schema({
    number: {
        type: Number,
        //required: true,
        immutable: true,
        unique: true,
    },
    team_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        allowedValues: ["Web","Games"],
    },
    proj_name: {
        type: String,
        required: true
    },
    proj_desc: {
        type: String,
        required: true
    },
    captain: {
        type: String,
        required: true,
        immutable: true
    },
    members:{
        type: [String],
    },
    wants_members: {
        type: Boolean,
        required: true,
        default: false,
    },
    skills: {
        type: [String],
    },
    website: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        //immutable: true,
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
    registration: {
        type: Date,
    },
    disbanded: {
        type: Boolean,
        required: true,
        default: false,
    },



});

TeamSchema.plugin(AutoIncrement, {inc_field: 'number'});

Team = mongoose.model("teams", TeamSchema);

Team.publicInfo = {
    number: 1,
    team_name:1,
    category:1,
    proj_name:1,
    proj_desc:1,
    captain:1,
    members:1,
    wants_members:1,
    skills:1,
    website: 1,
    password: 0,
    pending: 0,
    validated: 0,
    registration: 0,
    disbanded: 0,
};

Team.membersInfo = {
    number: 1,
    team_name:1,
    category:1,
    proj_name:1,
    proj_desc:1,
    captain:1,
    members:1,
    wants_members:1,
    skills:1,
    website: 1,
    password: 1,
    pending: 1,
    validated: 1,
    //registration: 0,
    //disbanded: 0,
};

Team.adminInfo = {
    number: 1,
    team_name:1,
    category:1,
    proj_name:1,
    proj_desc:1,
    captain:1,
    members:1,
    wants_members:1,
    skills:1,
    website: 1,
    password: 1,
    pending: 1,
    validated: 1,
    registration: 1,
    disbanded: 1,
};

Team.allowEdit = {
    //number: 1,
    team_name:1,
    category:1,
    proj_name:1,
    proj_desc:1,
    //captain:1,
    //members:1,
    wants_members:1,
    skills:1,
    website: 1,
    //password: 1,
    //pending: 1,
    //validated: 1,
    //registration: 0,
    //disbanded: 0,
};

module.exports = Team;
