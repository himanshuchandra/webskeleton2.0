'use strict';

const User = require("../userschema");
const commonOperations=require("./commonoperations");
const logger = require("../logger");

const dbOperations= {

    /////Send email activation link
    sendActivationLink:function(email,response){
        logger.debug('crud index sendActivationLink');
        commonOperations.sendLink(email,"emailactivate","emailactivationtoken");
        //need to be a callback function
        response.json({message:"success"});
    },

    ///////Check and Update session
    checkSession:function(request,response,userData){
        logger.debug('crud index checkSession');
        var that=this;
        var userEmail=userData.useremail;
        User.find({
            useremail:userEmail
        },
        function(error,result){
            if(error){
                logger.error(error);
            }
            else{
                logger.debug('crud result'+ result); 
                if(result.length<1){
                    response.json({message:"fail"});
                }
                else{
                    var status={};
                    status.Message="Hello "+result[0].username;
                    status.Email=result[0].useremail;
                    status.ActivationStatus=result[0].emailverified;
                    if(result[0].username!=userData.username || result[0].userinfo!=userData.userinfo){
                        var sessionData=result[0];
                        const utils = require("../utils");
                        utils.fillSession(request,response,sessionData,status); 
                    }
                    else{
                        status.userData=userData;
                        response.send(status);
                    }
                }
            }
        })
    },

    //////Session destroy
    destroySession:function(request,response){
        logger.debug('crud index destroySession');
        const utils = require("../utils");
        if(request.body.appCall===true && request.body.sessionidValid===true){
            utils.appSessionDestroy(request.body.sessionid,response);
        }
        else{
            utils.webSessionDestroy(request,response);
        }
    }

};

module.exports =dbOperations;