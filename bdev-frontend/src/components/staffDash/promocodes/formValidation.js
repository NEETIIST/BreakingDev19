import FormValidator from "../../../utils/FormValidator";

export const promoCodeInput = new FormValidator([
    {
        field: "code",
        method: "isEmpty",
        validWhen: false,
        message: "forms.code.empty"
    },
    {
        field: "code",
        method: "isLength",
        args: [{min:5, max: 12}],
        validWhen: true,
        message: "forms.code.toolong"
    },
    /*{
        field: "code",
        method: "isAlphanumeric",
        args:[{locale:"pt-PT"}],
        validWhen: true,
        message: "forms.code.invalid"
    },*/
    {
        field: "value",
        method: "isEmpty",
        validWhen: false,
        message: "forms.value.empty"
    },
    {
        field: "value",
        method: "isInt",
        args: [{min:0}],
        validWhen: true,
        message: "forms.value.invalid"
    },
    {
        field: "teamCode",
        method: "isEmpty",
        validWhen: false,
        message: "forms.teamCode.empty"
    },
    {
        field: "teamCode",
        method: "isBoolean",
        validWhen: true,
        message: "forms.teamCode.invalid"
    },


]);

