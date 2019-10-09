import FormValidator from "../../../utils/FormValidator";

export const ticketInput = new FormValidator([
    {
        field: "username",
        method: "isEmpty",
        validWhen: false,
        message: "forms.username.empty"
    },
    {
        field: "description",
        method: "isLength",
        args: [{max: 512}],
        validWhen: true,
        message: "forms.description_raffle.toolong"
    },
    {
        field: "raffle",
        method: "isIn",
        args:[["job_fair","event_award","volunteer_raffle"]],
        validWhen: true,
        message: "forms.raffle.invalid"
    },



]);

