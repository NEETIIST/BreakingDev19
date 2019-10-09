import FormValidator from "../../../utils/FormValidator";

export const companyAddInput = new FormValidator([
    {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "forms.name.empty"
    },
    {
        field: "name",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.name.toolong"
    },
    {
        field: "short",
        method: "isEmpty",
        validWhen: false,
        message: "forms.course.empty"
    },
    {
        field: "short",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.course.toolong"
    },


]);


export const companyEditInput = new FormValidator([
    {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "forms.name.empty"
    },
    {
        field: "name",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.name.toolong"
    },
    {
        field: "short",
        method: "isEmpty",
        validWhen: false,
        message: "forms.course.empty"
    },
    {
        field: "short",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.course.toolong"
    },
    {
        field: "job",
        method: "isEmpty",
        validWhen: false,
        message: "forms.job.empty"
    },
    {
        field: "job",
        method: "isLength",
        args: [{min:0, max: 2048}],
        validWhen: true,
        message: "forms.job.toolong"
    },
    {
        field: "search",
        method: "isEmpty",
        validWhen: false,
        message: "forms.search.empty"
    },
    {
        field: "search",
        method: "isLength",
        args: [{max: 2048}],
        validWhen: true,
        message: "forms.search.toolong"
    },
    {
        field: "website",
        method: "isEmpty",
        validWhen: false,
        message: "forms.website.empty"
    },
    {
        field: "website",
        method: "isLength",
        args: [{min:0, max: 512}],
        validWhen: true,
        message: "forms.website.toolong"
    },
    {
        field: "email",
        method: "isEmpty",
        validWhen: false,
        message: "forms.email.empty"
    },
    {
        field: "email",
        method: "isLength",
        args: [{min:0, max: 512}],
        validWhen: true,
        message: "forms.email.toolong"
    },



]);


