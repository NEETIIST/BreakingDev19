import FormValidator from "../../../utils/FormValidator";

export const staffProfileInput = new FormValidator([
    {
        field: "name",
        method: "isEmpty",
        validWhen: false,
        message: "forms.name.empty"
    },
    {
        field: "name",
        method: "isLength",
        args: [{min:0, max: 128}],
        validWhen: true,
        message: "forms.name.toolong"
    },
    {
        field: "age",
        method: "isEmpty",
        validWhen: false,
        message: "forms.age.empty"
    },
    {
        field: "age",
        method: "isInt",
        args: [{min:15, max: 99}],
        validWhen: true,
        message: "forms.age.invalid"
    },
    {
        field: "college",
        method: "isEmpty",
        validWhen: false,
        message: "forms.college.empty"
    },
    {
        field: "college",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.college.toolong"
    },
    {
        field: "course",
        method: "isEmpty",
        validWhen: false,
        message: "forms.course.empty"
    },
    {
        field: "course",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.course.toolong"
    },
    {
        field: "phone",
        method: "isEmpty",
        validWhen: false,
        message: "forms.phone.empty"
    },
    {
        field: "phone",
        method: "isMobilePhone",
        args: ["pt-PT"],
        validWhen: true,
        message: "forms.phone.invalid"
    },
    {
        field: "bio",
        method: "isLength",
        args: [{min:0, max: 512}],
        validWhen: true,
        message: "forms.bio.toolong"
    },
    {
        field: "job",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.job.toolong"
    },
    {
        field: "github",
        method: "isLength",
        args: [{max: 128}],
        validWhen: true,
        message: "forms.github.toolong"
    },
    {
        field: "linkedin",
        method: "isLength",
        args: [{max: 128}],
        validWhen: true,
        message: "forms.linkedin.toolong"
    },
    {
        field: "twitter",
        method: "isLength",
        args: [{max: 128}],
        validWhen: true,
        message: "forms.twitter.toolong"
    },


]);

