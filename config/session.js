'use strict';

const config = require('./config');
const logger = require("../config/logger");
const validate=require("../config/validate");
const commonOperations = require('./crudoperations/commonoperations');
const urls = ['/webindex','/sendActivationLink','/logout','/profile/changeUsername','/profile/updateProfileData','/profile/updateMobile','/profile/verifyCode','/profile/setNewPassword','/profile/uploadPic'];

var authenticator = {

    webSession:function(request,response,next){
        if(urls.indexOf(request.url)>-1){
            
            logger.debug('session > websession');
            
            var isValidSessionid = false;
            var webSessionExist = false;

            if (request.body.appCall && request.body.sessionid) {
                isValidSessionid = validate.string(request.body.sessionid);
            }
            else if (request.session.user) {
                webSessionExist = true;
            }
            
            if (webSessionExist) {
                request.userData = request.session.user;
                request.sessionMode = 'web';
                next();
            }
            else if (isValidSessionid) {
                var userData = {};
                commonOperations.getProfileData(request.body.sessionid, userData, function (userData) {
                    if (userData) {
                        request.userData = userData;
                        request.sessionMode = 'app';
                        next();
                    }
                    else {
                        response.json({ message: "unknown" });
                    }
                });
            }
            else {
                response.json({ message: "unknown" });
            }
        }
        else{
            next();
        } 
    }
}

module.exports = authenticator;