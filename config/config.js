'use strict';

const secrets={
    dbUrl:"mongodb://localhost:27017/webskeleton3",
    userCollection:"users",
    sessionCollection:"appsessions",
    roleCollection:"roles",
    sessionKey:["ggggg","aaaaa","sssssss","hhhhh","ffff","kkkkkk","ttt","aaaa"],
    jwtKey:'supersecret',
    jwtDuration: 86400,  //expires in 24 hours 
    reqUrl:"http://localhost:1234",
    defaultSessionDuration:2*60*60,
    sessionMode: 'jwt',
    superadminEmail:'surveyshimanshu@gmail.com',
    defaultRole:"customer",
    SMTPS_EMAIL:"surveyshimanshu@gmail.com",
    SMTPS_PASSWORD:"surveys9990",
    SMTPS_URL:'smtp.gmail.com',
    COMPANY_NAME:'ILUZEX',
    TWILIO_ACCOUNT_SID:'AC0b2132f1cf34e21a6ea933ee86fef0f6',
    TWILIO_AUTH_TOKEN:'c45b613c5e6f778d2a26340c2268c5ff',
    VALID_TWILIO_NUMBER:'+13148885390',
    FACEBOOK_CLIENT_ID:'1939755899569324',
    FACEBOOK_CLIENT_SECRET:'5465ea0ca2dc2a05a27e1632a09d8965',
    GOOGLE_CLIENT_ID:'11067462844-4s6bjl47j6m7v2g4it1ndnfbgirk7m3g.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET:'rY6ZwdUkUWzmUcmB9Tcg63r-'
}
module.exports=secrets;
/*
const secrets={
    dbUrl:"mongodb://localhost:27017/iluzexdb",
    dbCollection:"ilusers",
    sessionCollection:"appsessions",
    sessionKey:["ggggg","aaaaa","sssssss","hhhhh","ffff","kkkkkk","ttt","aaaa"],
    reqUrl:"http://localhost:1234",
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