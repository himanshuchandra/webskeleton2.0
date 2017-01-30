var NodeMailer = require("nodemailer");
var Config =require("./config");
var Utils={

    SendMail:function(){

    
    var URL="smtps://"+Config.SMTPS_EMAIL+":"+Config.SMTPS_PASSWORD+"@"+Config.SMTPS_URL;
    
    var transporter = NodeMailer.createTransport(URL);
    // setup e-mail data with unicode symbols
    var mailOptions = {
    from: Config.COMPANY_NAME+ '<h='+Config.SMTPS_EMAIL+'>' , // sender address
    to: ' hc160160@gmail.com', // list of receivers
    subject: 'I forgot✔', // Subject line
    text: 'Hello world ?', // plaintext body
    html: '<b>Hello world ?</b>' // html body
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