'use strict';

const config =require("./config");
const AppSession=require('./appsessdbschema');

const utils={

    fillWebSession:function(request,userData) {
        request.session.user=userData;
        if(userData.rememberMe==true){
            var thirtyDays = 30*24*60*60*1000;
            request.session.cookie.expires = new Date(Date.now() + thirtyDays);
        }
    },
    
    fillAppSession:function(userData,responseObject,response){
        
        userData._id=undefined; //prevent duplicate record error
        userData=userData.toObject();
        userData.sessionid=responseObject.sessionid;
        
        AppSession.create(userData,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{
                response.send(responseObject);
            }
        });
    },

    fillSession:function(request,response,result,responseObject){

        //data is freezed object so no issue till not adding any new property
        var userData=result;
        userData.password1=undefined;
        userData.salt=undefined;
        userData.passwordtokenstamp=undefined;
        userData.emailactivationtoken=undefined;
        userData.forgotpasswordtoken=undefined;
        userData.mobileverificationcode=undefined;
        userData.updated=undefined;
        userData.facebookAccessToken=undefined;
        
        if(request.body.appCall===true){
            if(request.body.sessionid!=undefined){
                AppSession.find({sessionid:request.body.sessionid}).remove(function(error,result){
                    if(error){
                        console.log(error);
                    }
                });
            }
            var randomString=this.randomStringGenerate(32);
            responseObject.sessionid=randomString+userData.username;
            responseObject.userData=userData;
            this.fillAppSession(userData,responseObject,response);
        }
        else{
            this.fillWebSession(request,userData);
            responseObject.userData=userData;
            response.send(responseObject);
        }
    },

    webSessionDestroy:function(request,response){
        request.session.destroy(function(error) {
            if(error){
                console.log(error);
            }
            else{
                response.json({message:"success"});
            }
        });
    },

    appSessionDestroy:function(id,response){

        AppSession.find({sessionid:id}).remove(function(error,result){
            if(error){
                console.log(error);
            }
            else{
                response.json({message:"success"});
            }
        });
    },

    sendMail:function(To,Subject,EmailText,Html_Body){
        const nodeMailer = require("nodemailer");
        var URL="smtps://"+config.SMTPS_EMAIL+":"+config.SMTPS_PASSWORD+"@"+config.SMTPS_URL;
        
        var transporter = nodeMailer.createTransport(URL);
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: config.COMPANY_NAME+ '<h='+config.SMTPS_EMAIL+'>' , // sender address
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

    randomStringGenerate:function(x){
        const randomString = require("randomstring");
        return randomString.generate(x);
    },

    sendSms:function(number,body){
        const twilio = require("twilio");
        var accountSid = config.TWILIO_ACCOUNT_SID; 
        var authToken = config.TWILIO_AUTH_TOKEN;   

        var client = new twilio.RestClient(accountSid, authToken);

        client.messages.create({
            body: body,
            to: number,  // Text this number
            from: config.VALID_TWILIO_NUMBER, // From a valid Twilio number
        }, function(err, message) {
            if(err){
                console.log(err);
            }
            else{
                console.log(message.sid);
            }
        });
    },

};

module.exports=utils;