'use strict';

const secrets={
    dbUrl:"mongodb://localhost:27017/iluzexdb",
    dbCollection:"ilusers",
    sessionCollection:"appsessions",
    sessionKey:["ggggg","aaaaa","sssssss","hhhhh","ffff","kkkkkk","ttt","aaaa"],
    reqUrl:"http://localhost:1234",
    mongoUrl:'mongodb://localhost:27017/iluzexdb',
    defaultSessionDuration:2*60*60,
    SMTPS_EMAIL:"surveyshimanshu@gmail.com",
    SMTPS_PASSWORD:"surveys9990",
    SMTPS_URL:'smtp.gmail.com',
    COMPANY_NAME:'ILUZEX',
    TWILIO_ACCOUNT_SID:'AC0b2132f1cf34e21a6ea933ee86fef0f6',
    TWILIO_AUTH_TOKEN:'c45b613c5e6f778d2a26340c2268c5ff',
    VALID_TWILIO_NUMBER:'+13148885390',
    FACEBOOK_CLIENT_ID:'168537820347187',
    FACEBOOK_CLIENT_SECRET:'4748f69d0a8de5e36367bbbccaf3378f'
}
module.exports=secrets;
/*
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
*/