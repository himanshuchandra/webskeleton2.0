'use strict';

const config = require('./config');
const logger = require("../config/logger");
const validate=require("../config/validate");
const commonOperations = require('./crudoperations/commonoperations');
const roleOps = require('./crudoperations/rolecrud');
const allUrls = require('./registeredUrls');
const confUrls = require('./confUrls');
const authUrls = allUrls.authUrls;
const simpleUrls = allUrls.urls;

var urls = [];
var surls = [];

Object.keys(authUrls).forEach(function(key){
    for(var i = 0;i<authUrls[key].length;i++){
        var reqUrl = key + authUrls[key][i];
        urls.push(reqUrl);
    }
});

Object.keys(confUrls).forEach(function(key){
    for(var i = 0;i<confUrls[key].length;i++){
        var reqUrl = key + confUrls[key][i];
        urls.push(reqUrl);
    }
});

Object.keys(simpleUrls).forEach(function(key){
    for(var i = 0;i<simpleUrls[key].length;i++){
        var reqUrl = key + simpleUrls[key][i];
        surls.push(reqUrl);
    }
});


var checkRights=function(request,response,next){
    roleOps.getRole(request.userData.role,(error,result)=>{
        if(result[0]){
            var rights=[];
            for(var i=0;i<result[0].rights.length;i++){
                rights.push(result[0].rights[i].url);
            }  
            if(rights.indexOf(request.url)>-1){
                next();
            }
            else{
                response.json({"message":"denied"});
            }
        }
        else{
            response.json({"message":"unknown"});
        }
    });
};

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
                checkRights(request,response,next);
            }
            else if (isValidSessionid) {
                var userData = {};
                commonOperations.getProfileData(request.body.sessionid, userData, function (userData) {
                    if (userData) {
                        request.userData = userData;
                        request.sessionMode = 'app';
                        checkRights(request,response,next);
                    }
                    else {
                        response.json({ message: "unknown" });
                    }
                });
            }
            else if(surls.indexOf(request.url)>-1){
                next();
            }
            else{
                response.json({ message: "unknown" });
            }
        }
        else{
            next();
        } 
    },

    jwtSession: function (request, response, next) {

        if(urls.indexOf(request.url)>-1){
            logger.debug('session > jwtSession');
            const jwt = require('jsonwebtoken');
            const jwtOps = require('./jwt');

            const tokenHeader = request.headers["authorization"];
            if(typeof tokenHeader !== 'undefined'){
                const tokenArray = tokenHeader.split(" ");
                const token = tokenArray[1];
                request.token = token;

                jwtOps.getUserid(token,(userData)=>{
                    if(userData){
                        request.userData = userData;
                        request.sessionMode = 'jwt';
                        jwt.verify(request.token, config.jwtKey, function (error, result) {
                            if (error) {
                                logger.error(error);
                                response.json({ message: "unknown" });
                            }
                            else {
                                checkRights(request,response,next);
                            }
                        })
                    }
                    else{
                        response.json({ message: "unknown" });
                    }  
                })
            }
            else if(surls.indexOf(request.url)>-1){
                next();
            }
            else{
                response.json({ message: "unknown" });
            }
        }
        else{
            next();
        } 
    }
}

module.exports = authenticator;