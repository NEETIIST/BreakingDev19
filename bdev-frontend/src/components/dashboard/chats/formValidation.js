import FormValidator from "../../../utils/FormValidator";

export const messageInput = new FormValidator([
    /*
    {
        field: "message",
        method: "isEmpty",
        validWhen: false,
        message: "forms.message.empty"
    },
    */
    {
        field: "message",
        method: "isLength",
        args: [{min:0, max: 256}],
        validWhen: true,
        message: "forms.message.toolong"
    },


]);
