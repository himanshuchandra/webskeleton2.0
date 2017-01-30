var NodeMailer = require("nodemailer");
var Config =require("./config");
var Utils={

    SendMail:function(To,Subject,EmailText,Html_Body){

    //console.log(To);
    var URL="smtps://"+Config.SMTPS_EMAIL+":"+Config.SMTPS_PASSWORD+"@"+Config.SMTPS_URL;
    
    var transporter = NodeMailer.createTransport(URL);
    // setup e-mail data with unicode symbols
    var mailOptions = {
    from: Config.COMPANY_NAME+ '<h='+Config.SMTPS_EMAIL+'>' , // sender address
    to: To, // list of receivers
    subject: Subject, // Subject line
    text: EmailText, // plaintext body
    html: Html_Body // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
    },

    RandomStringGenerate:function(){

    },


}

module.exports=Utils;