const NodeMailer = require("nodemailer");
const RandomString = require("randomstring");
const Twilio = require("twilio");

var Config =require("./config");
var Utils={

    FillSession:function(request,data) {
    
        //sessionDestroy(request);
        userData=data;
        userData["0"].password1=undefined;
        userData["0"].passwordtokenstamp=undefined;
        userData["0"].emailactivationtoken=undefined;
        userData["0"].forgotpasswordtoken=undefined;
        userData["0"].mobileverificationcode=undefined;

        console.log(userData);
        //console.log(userData);
        //console.log(userData["0"].password1);
        //var userData=data;
        request.session.user=userData;
        if(userData["0"].rememberMe==true){
            var thirtyDays = 30*24*60*60*1000;
            request.session.cookie.expires = new Date(Date.now() + thirtyDays);
        }
        //console.log(data["0"].useremail);
    },

    SessionDestroy:function(request){
        request.session.destroy(function(err) {
            console.log("cannot access session here"); 
        });
        
    },

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

    RandomStringGenerate:function(x){
        return RandomString.generate(x);
    },

    SendSms:function(number,body){
        var accountSid = Config.TWILIO_ACCOUNT_SID; 
        var authToken = Config.TWILIO_AUTH_TOKEN;   

        var client = new Twilio.RestClient(accountSid, authToken);

        client.messages.create({
            body: body,
            to: number,  // Text this number
            from: Config.VALID_TWILIO_NUMBER, // From a valid Twilio number
        }, function(err, message) {
            if(err){
                console.log(err);
                //response.json({"msg":"error"});
            }
            console.log(message.sid);
        });

    },


};

module.exports=Utils;