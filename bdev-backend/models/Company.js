const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const CompanySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
    },
    job: {
        type: String,
    },
    search: {
        type: String,
    },
    website: {
        type: String,
    },
    email: {
        type: String,
    },
    members:{
        type: [String],
    },
    codes:{
        type: [String],
    },



});

//CompanySchema.plugin(AutoIncrement, {inc_field: 'number'});

Company = mongoose.model("companies", CompanySchema);

Company.publicInfo = {
    name:1,
    short:1,
    job:1,
    search:1,
    website:1,
    email:1,
    members:1,
    //codes:1,
};

Company.editableFields = {
    name:1,
    //short:1,
    job:1,
    search:1,
    website:1,
    email:1,
    //members:1,
    //codes:1,
};

Company.memberInfo = {
    name:1,
    short:1,
    job:1,
    search:1,
    website:1,
    email:1,
    members:1,
    //codes:1,
};


Company.adminInfo = {
    name:1,
    short:1,
    job:1,
    search:1,
    website:1,
    email:1,
    members:1,
    codes:1,
};

module.exports = Company;
