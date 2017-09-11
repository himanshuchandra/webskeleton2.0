'use strict';

//Routing for login factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/login");
const validate =require("../config/validate");
const logger = require("../config/logger");

///Logging in 
router.post('/login',function(request,response){
    logger.debug('routes login login');
    request.body.loginid=request.body.loginid.toLowerCase();
    var loginObject=request.body;
    var isValidUserEmail=validate.email(loginObject.loginid);
    var isValidUsername=validate.username(loginObject.loginid);
    var isValidMobile=validate.mobile(loginObject.loginid);
    var isValidPassword=validate.password(loginObject.loginpassword);
    if((isValidUserEmail===true || isValidUsername===true || isValidMobile===true) && isValidPassword===true
    && (loginObject.rememberMe===true || loginObject.rememberMe===false || loginObject.rememberMe===undefined)){
        dbOperations.doLogin(request,response);
    }
    else{
        response.json({message:"fail"});
    }
});

module.exports = router;