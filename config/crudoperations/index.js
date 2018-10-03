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
        User.findOne({
            useremail:userEmail
        },
        function(error,result){
            if(error){
                logger.error(error);
            }
            else{
                logger.debug('crud result'); 
                if(!result){
                    response.json({message:"fail"});
                }
                else{
                    var status={};
                    status.Message="Hello "+result.username;
                    status.Email=result.useremail;
                    status.ActivationStatus=result.emailverified;
                    // if(result.username!=userData.username || result.userinfo!=userData.userinfo){
                        var sessionData=result;
                        const utils = require("../utils");
                        utils.fillSession(request,response,sessionData,status); 
                    // }
                    // else{
                    //     status.userData=userData;
                    //     response.send(status);
                    // }
                }
            }
        })
    },

    //////Session destroy
    destroySession:function(request,response){
        logger.debug('crud index destroySession');
        const utils = require("../utils");
        if(request.sessionMode === 'jwt'){
            utils.appSessionDestroy(request.token,response);
        }
        else if(request.sessionMode === 'app'){
            utils.appSessionDestroy(request.body.sessionid,response);
        }
        else if(request.sessionMode === 'web'){
            utils.webSessionDestroy(request,response);
        }
    }

};

module.exports =dbOperations;