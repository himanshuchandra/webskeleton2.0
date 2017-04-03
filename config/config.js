'use strict';

const secrets={
    dbUrl:"mongodb://localhost:27017/iluzexdb",
    dbCollection:"ilusers",
    sessionCollection:"appsessions",
    sessionKey:["ggggg","aaaaa","sssssss","hhhhh","ffff","kkkkkk","ttt","aaaa"],
    reqUrl:"http://localhost:1234",
    mongoUrl:'mongodb://localhost:27017/iluzexdb',
    defaultSessionDuraion:2*60*60,
    SMTPS_EMAIL:"Senders Email",
    SMTPS_PASSWORD:"Password",
    SMTPS_URL:'smtp.gmail.com',
    COMPANY_NAME:'ILUZEX',
    TWILIO_ACCOUNT_SID:'twilio account sid',
    TWILIO_AUTH_TOKEN:'twilio account password',
    VALID_TWILIO_NUMBER:'twilio account number',
}
module.exports=secrets;
