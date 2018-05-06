'use strict';

const User = require("../userschema");
const utils = require("../utils");
const logger = require("../logger");
const config = require("../config");

const dbOperations = {

    ////////Checking if username exists  ///////////////////// 
    checkUsername: function (object, callback) {
        logger.debug('crud common checkUsername');
        
        User.find({ "username": object.username }, function (error, result) {
            if (error) {
                logger.error(error);
            }
            else {
                logger.debug('crud result'+ result); 
                if (result[0] != undefined) {
                    object.notFound = false;
                }
                else {
                    object.notFound = true;
                }
            }
            callback();
        });
    },

    ///////////Email activation /////////////////////////
    ////////Checking token for activation
    checkToken: function (request, response) {
        logger.debug('crud common checkToken');
        var that = this;
        var activationObject = request.body;

        User.find({
            "$and": [
                {
                    "useremail": activationObject.userEmail
                },
                {
                    "emailactivationtoken": activationObject.token
                }
            ]
        }
            , function (error, result) {
                if (error) {
                    logger.error(error);
                }
                else {
                    logger.debug('crud result'+ result); 
                    if (result.length < 1) {
                        response.json({ message: "fail" });
                    }
                    else {
                        that.activateEmail(activationObject.userEmail, response);
                    }
                }
            });
    },

    //////////Activating email
    activateEmail: function (userEmail, response) {
        logger.debug('crud common activateEmail');
        User.update({
            "useremail": userEmail
        },
            {
                $set: {
                    "emailverified": true,
                    "emailactivationtoken": undefined
                }
            },
            function (error, result) {
                if (error) {
                    logger.error(error);
                }
                else {
                    logger.debug('crud result'+ result); 
                    response.json({ message: "success" });
                }
            });
    },


    //////////////////Social Signin//////////////////////////
    ///////////Check if user exists
    socialSignin: function (request, response, done) {
        logger.debug('crud common socialSignin');
        var that = this;
        var SocialObject = request.body;

        User.find({
            "useremail": SocialObject.Email
        }
            , function (error, result) {
                if (error) {
                    logger.error(error);
                    return done(null);
                }
                else if (result) {
                    logger.debug('crud result'+ result); 
                    if (result[0] === undefined) {
                        that.socialRegister(request, response, done);
                    }
                    else {
                        var sessionData = result[0];
                        var responseObject = {    //No use
                            message: "loggedIn",
                            callback: done
                        };
                        utils.fillSession(request, response, sessionData, responseObject);
                    }
                }
                else {
                    return done(null);
                }
            })
    },




    ////////Register new User
    socialRegister: function (request, response, done) {
        var that = this;
        logger.debug('crud common socialRegister');
        var SocialObject = request.body;
        var aPosition = SocialObject.Email.indexOf("@");
        var userName = SocialObject.Email.substring(0, aPosition + 1);
        userName = userName + SocialObject.Social;

        var UserData = {};
        UserData.userinfo = {};
        UserData.useremail = SocialObject.Email;
        UserData.username = userName;
        UserData.password1 = "social";
        UserData.role = config.defaultRole;
        UserData.registrationdate = new Date();
        UserData.userinfo.fullname = SocialObject.FullName;
        UserData.emailverified = SocialObject.verified;
        UserData.userid = utils.randomStringGenerate(32);

        UserData.social = [];
        UserData.social[0] = {};
        UserData.social[0].connection = SocialObject.Social;
        UserData.social[0].sId = SocialObject.socialId;
        UserData.social[0].accessToken = SocialObject.accessToken;

        User.create(UserData, function (error, result) {
            if (error) {
                logger.error(error);
                response.json({ message: "Can't Add Error Occured, Try later" });
                return done(null);
            }
            else {
                logger.debug('crud result'+ result); 
                if(!UserData.emailverified){
                    that.sendLink(result.useremail,"emailactivate","emailactivationtoken");
                }
                var responseObject = {     //No use
                    message: "registered",
                    callback: done
                };
                utils.fillSession(request, response, result, responseObject);
            }
        });
    },


    ////////////Send Activation/forgotpassword link//////////////
    sendLink: function (UserEmail, Page, TokenType) {
        logger.debug('crud common sendLink');
        const config = require("../config");
        var RandomToken = utils.randomStringGenerate(32);
        var Query = {};
        var userData = {};
        if (TokenType === "forgotpasswordtoken") {
            Query["passwordtokenstamp"] = new Date();
            userData.type = "forgotpassword";
        }
        else {
            userData.type = "verificationlink";
        }
        Query[TokenType] = RandomToken;
        var Url = config.reqUrl + "/#/" + Page + "?e=" + UserEmail + "&t=" + RandomToken;

        User.update({
            "useremail": UserEmail
        },
            {
                $set: Query
            },
            function (error, result) {
                if (error) {
                    logger.error(error);
                }
                else {
                    logger.debug('crud result' + result);
                    userData.email = UserEmail;
                    userData.url = Url;

                    utils.createMail(userData, userData.type);
                }
            });

    },

    ///////// Mobile Application only operations////////////

    getProfileData: function (id, userData, callback) {
        logger.debug('crud common getProfileData');
        const Session = require('../sessionschema');
        Session.find({ sessionid: id }, function (error, result) {
            if (error) {
                logger.error(error);
            }
            else {
                logger.debug('crud result'+ result); 
                userData = result[0];
            }
            callback(userData);
        });
    },
};

module.exports = dbOperations; 
