import FormValidator from "../../../utils/FormValidator";

export const teamInput = new FormValidator([
    {
        field: "team_name",
        method: "isEmpty",
        validWhen: false,
        message: "forms.team_name.empty"
    },
    {
        field: "team_name",
        method: "isLength",
        args: [{min:0, max: 128}],
        validWhen: true,
        message: "forms.team_name.toolong"
    },
    {
        field: "category",
        method: "isEmpty",
        validWhen: false,
        message: "forms.category.empty"
    },
    {
        field: "category",
        method: "isIn",
        args:[["Games","Web"]],
        validWhen: true,
        message: "forms.category.invalid"
    },
    {
        field: "proj_name",
        method: "isEmpty",
        validWhen: false,
        message: "forms.proj_name.empty"
    },
    {
        field: "proj_name",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.proj_name.toolong"
    },
    {
        field: "proj_desc",
        method: "isEmpty",
        validWhen: false,
        message: "forms.proj_desc.empty"
    },
    {
        field: "proj_desc",
        method: "isLength",
        args: [{min:0, max: 1024}],
        validWhen: true,
        message: "forms.proj_desc.toolong"
    },
    {
        field: "wants_members",
        method: "isEmpty",
        validWhen: false,
        message: "forms.wants_members.empty"
    },
    {
        field: "wants_members",
        method: "isBoolean",
        validWhen: true,
        message: "forms.wants_members.invalid"
    },
    {
        field: "website",
        method: "isLength",
        args: [{max: 256}],
        validWhen: true,
        message: "forms.website.toolong"
    },
    /*  Doesn't work if empty
    {
        field: "website",
        method: "isURL",
        validWhen: true,
        message: "forms.website.invalid"
    },
    */


]);


export const passwordInput = new FormValidator([
    {
        field: "password",
        method: "isEmpty",
        validWhen: false,
        message: "forms.access_code.empty"
    },
    {
        field: "password",
        method: "isLength",
        args: [{min:0, max: 128}],
        validWhen: true,
        message: "forms.access_code.toolong"
    },
    {
        field: "password",
        method: "contains",
        args: ["-"],
        validWhen: true,
        message: "forms.access_code.invalid"
    },

]);

