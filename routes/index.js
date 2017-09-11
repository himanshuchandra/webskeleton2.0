'use strict';

///Routing for index factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/index");
const logger = require("../config/logger");

/* GET home page. */
router.get('/', function(req, res, next) {
    var path = require("path");
    var welcomePage = require("../config/pages");
    var newPath = path.normalize(__dirname+"/..");
    var homePagePath = path.join(newPath,welcomePage);
    res.sendFile(path.resolve(homePagePath));

});

///Check login Status
router.post('/webindex', function(request,response) {
    logger.debug('routes index webindex');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require("../config/validate");
        var isValidSessionid=validate.string(request.body.sessionid);
        if(isValidSessionid===true){
            var userData={};
            const commonOperations=require("../config/crudoperations/commonoperations");
            commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
                if(userData!=undefined){
                    dbOperations.checkSession(request,response,userData);
                }
                else{
                    response.json({message:"fail"});
                }
            });
        }
        else{
            response.json({message:"fail"});
        }
    }
    else if(request.session.user){
        dbOperations.checkSession(request,response,request.session.user);
    }
    else{
        response.json({message:"fail"});
    }
});

///Send email activation link
router.post('/sendActivationLink',function(request,response){
    logger.debug('routes index sendActivationLink');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require("../config/validate");
        var isValidSessionid=validate.string(request.body.sessionid);
        if(isValidSessionid===true){
            var userData={};
            const commonOperations=require("../config/crudoperations/commonoperations");
            commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
                if(userData!=undefined){
                    var userEmail=userData.useremail;
                    dbOperations.sendActivationLink(userEmail,response);
                }
                else{
                    response.json({message:"unknown"});
                }
            });
        }
        else{
            response.json({message:"unknown"});
        }
    }
    else if(request.session.user){
        var userEmail=request.session.user.useremail;
        dbOperations.sendActivationLink(userEmail,response);
    }
    else{
        response.json({message:"unknown"});
    }
});

///Logging out
router.post('/logout',function(request,response){
    logger.debug('routes index logout');
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        const validate=require('../config/validate');
        var isValidSessionid=validate.string(request.body.sessionid)
        if(isValidSessionid===true){
            request.body.sessionidValid=true;
        }
        else{
            response.json({message:"success"});
        }
    }
    dbOperations.destroySession(request,response);
});

module.exports = router;
