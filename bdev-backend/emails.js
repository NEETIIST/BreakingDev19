const User = require("./models/User");

const keys = require("./config/keys");
const Mailgun = require('mailgun-js');
const api_key = keys.mailgunAPI;
const domain = 'mg.breakingdev.pt';

// Email Templates
const createdAccount = (args)=>{
    return{
        from: "no-reply@breakingdev.pt",
        subject: "[BreakingDev] Criada Conta de Utilizador",
        html: '<p style="color:#257183"><b>Olá '+args.username+'</b></p><p>Obrigado por criares conta no site do BreakingDev.</p>\n' +
            '<p>O próximo passo para participares é <a style="color:#257183" href="http://breakingdev.pt/dashboard/profile" target="_blank">preencheres os teus dados de Perfil</a>.</p>\n' +
            '<p>Depois de preenchidos, deves pedir a validação dos teus dados por parte da organização. Este processo é bastante rápido, e depois disso já vais poder criar ou juntar-te a uma equipa.</p>' +
            '<p>Se tiveres alguma dúvida podes sempre falar connosco através das nossas redes sociais <a style="color:#257183" href="https://www.facebook.com/BreakingDev/" target="_blank">Facebook</a> e <a style="color:#257183" href="https://www.instagram.com/breaking.dev/" target="_blank">Instagram</a>, ou então por e-mail para <a style="color:#257183" href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank">breakingdev@neeti.tecnico.ulisboa.pt</a>.'
    }
};

const profileValidated = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] Perfil Validado",
    html: '<p style="color:#257183"><b>Olá '+args.name+'</b></p>' +
        '<p>O teu Perfil no site do BreakingDev acabou de ser validado pela organização!</p>' +
        '<p>A partir de agora, já podes <a style="color:#257183" href="http://breakingdev.pt/dashboard/team" target="_blank">criar uma equipa ou juntar a uma existente</a>.</p>' +
        '<p>Se tiveres alguma dúvida podes sempre falar connosco através das nossas redes sociais <a style="color:#257183" href="https://www.facebook.com/BreakingDev/" target="_blank">Facebook</a> e <a style="color:#257183" href="https://www.instagram.com/breaking.dev/" target="_blank">Instagram</a>, ou então por e-mail para <a style="color:#257183" href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank">breakingdev@neeti.tecnico.ulisboa.pt</a>.'
}};

const channelStarted = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] "+args.originUser+" entrou em contacto contigo",
    html: '<p style="color:#257183"><b>Olá '+args.targetUser+'</b></p>' +
        '<p>Outro utilizador ('+args.originUser+') está a utilizar a nossa plataforma do BreakingDev para entrar em contacto contigo.</p>'+
        '<p>Podes ver esta conversa no teu Dashboard, <a style="color:#257183" href="http://breakingdev.pt/dashboard/chats" target="_blank">na secção de Conversas</a>.</p>'+
        '<p>Se tiveres alguma dúvida podes sempre falar connosco através das nossas redes sociais <a style="color:#257183" href="https://www.facebook.com/BreakingDev/" target="_blank">Facebook</a> e <a style="color:#257183" href="https://www.instagram.com/breaking.dev/" target="_blank">Instagram</a>, ou então por e-mail para <a style="color:#257183" href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank">breakingdev@neeti.tecnico.ulisboa.pt</a>.'
}};

// Pending
const inviteToTeam = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] "+args.name+" convidou-o para a sua Equipa",
    html: '<p style="color:#257183"><b>Olá!</b></p>' +
        '<p>Estás a receber este e-mail porque o/a '+args.name+' te convidou para participar no BreakingDev 2019!</p>'+
        '<p>Se ainda não conheces o BreakingDev, podes visitar o nosso site em <a style="color:#257183" href="http://breakingdev.pt/" target="_blank">http://breakingdev.pt</a> .</p>'+
        '<p>Se já conheces o evento, mas ainda não tens conta criada, regista-te já na opção <a style="color:#257183" href="http://breakingdev.pt/register" target="_blank">Criar Conta</a></p>'+
        '<p>O/A '+args.name+' convidou-te para te juntares à sua equipa '+args.team+'. Se estiveres interessado em juntar-te, e já tiveres o teu perfil validado, então basta clickares <a style="color:#257183" href="http://breakingdev.pt/dashboard/join?code='+args.code+'" target="_blank">aqui</a>.</p>'+
        '<p>Se o link não funcionar, podes usar o teu Dashboard, na <a style="color:#257183" href="http://breakingdev.pt/dashboard/teams" target="_blank">secção "Juntar a Equipa"</a> e usar o seguinte código de acesso: '+args.code+'</p>'+
        '<p>Se tiveres alguma dúvida podes sempre falar connosco através das nossas redes sociais <a style="color:#257183" href="https://www.facebook.com/BreakingDev/" target="_blank">Facebook</a> e <a style="color:#257183" href="https://www.instagram.com/breaking.dev/" target="_blank">Instagram</a>, ou então por e-mail para <a style="color:#257183" href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank">breakingdev@neeti.tecnico.ulisboa.pt</a>.'
}};

// Staff Bound
const userRequestedValidation = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] "+args.name+" pediu validação de perfil.",
    html: '<p style="color:#257183"><b>Atenção Staff !</b></p>\n' +
        '<p>O dev '+args.name+'(@'+args.username+') pediu a validação do seu perfil.</p>\n' +
        '<p>Acede ao <a style="color:#257183" href="http://breakingdev.pt/dashstaff/devs" target="_blank">Dashboard de Staff</a> para validar.</p>'
}};

const teamRequestedValidation = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] A equipa"+args.name+" pediu validação da inscrição.",
    html: '<p style="color:#257183"><b>Atenção Staff !</b></p>\n' +
        '<p>A equipa '+args.name+' pediu a validação da Inscrição.</p>\n' +
        '<p>Acede ao <a style="color:#257183" href="http://breakingdev.pt/dashstaff/teams" target="_blank">Dashboard de Staff</a> para validar.</p>'
}};


// Not Ready
/*
const teamValidated = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] Inscrição da Equipa Confirmada",
    html: '<p style="color:#257183"><b>Olá '+args.name+'</b></p><p>Obrigado por criares conta no site do BreakingDev.</p>\n' +
        '<p>O próximo passo para participares é <a style="color:#257183" href="http://breakingdev.pt/dashboard/profile" target="_blank">preencheres os teus dados de Perfil</a>.</p>\n' +
        '<p>Depois de preenchidos, deves pedir a validação dos teus dados por parte da organização. Este processo é bastante rápido, e depois disso já vais poder criar ou juntar-te a uma equipa.</p>' +
        '<p>Se tiveres alguma dúvida podes sempre falar connosco através das nossas redes sociais <a style="color:#257183" href="https://www.facebook.com/BreakingDev/" target="_blank">Facebook</a> e <a style="color:#257183" href="https://www.instagram.com/breaking.dev/" target="_blank">Instagram</a>, ou então por e-mail para <a style="color:#257183" href="mailto:breakingdev@neeti.tecnico.ulisboa.pt" target="_blank">breakingdev@neeti.tecnico.ulisboa.pt</a>.'
}};

const paymentConfirmed = (args)=>{ return {
    from: "no-reply@breakingdev.pt",
    subject: "[BreakingDev] Perfil Validado",
    html: "",
}};
*/

const testEmail1 = (args)=>{
    return {
        from: "no-reply@breakingdev.pt",
        to: 'tjacobmartins@gmail.com',
        subject: "testEmail1",
        html: "testemail1",
        //subject: '[BreakingDev] Pedido de Informação da empresa '+req.body.company,
        //html: 'A empresa '+req.body.company+', através do Sr./Sra. '+req.body.name+' pediu mais informações sobre o BreakingDev.<br><br>O número de telefone é: '+req.body.phone+'<br><br>O email fornecido é: '+req.body.email+'<br><br>Enviado automaticamente pelo site.'
    }
}


// Async Function to Send Emails
const sendEmail = async (email,username) => {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    User.findOne({"username":username}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user could be found for that username");

        email.to = user.email;

        mailgun.messages().send(email, function (err, body) {
            if (err) {
                console.log("got an error: ", err);
                //return res.status(500).send("There was a problem sending your email, please try again");
            }
            else {
                console.log(body);
                //return res.status(200).send("Email sent successfully");
            }
        });
    });
};

// Async Function to Send Emails To Staff General Email
const sendStaffEmail = async (email) => {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    User.findOne({"username":username}, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user could be found for that username");

        email.to = "breakingdev@neeti.tecnico.ulisboa.pt";
        mailgun.messages().send(email, function (err, body) {
            if (err) { console.log("got an error: ", err); }
            else { console.log(body); }
        });
    });
};


module.exports.createdAccount = createdAccount;
module.exports.profileValidated=profileValidated;
module.exports.userRequestedValidation=userRequestedValidation;
module.exports.teamRequestedValidation=teamRequestedValidation;
//module.exports.teamValidated=teamValidated;
module.exports.channelStarted=channelStarted;

module.exports.sendEmail = sendEmail;
module.exports.sendStaffEmail = sendStaffEmail;
