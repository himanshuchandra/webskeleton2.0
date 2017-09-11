'use strict';

///Routing for forgotpassword factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/forgotpassword");
const validate =require("../config/validate");
const logger = require("../config/logger");

//////Send Link
router.post('/sendLink',function(request,response){
    logger.debug('routes forgotpass sendlink');
    request.body.Email=request.body.Email.toLowerCase();
    var forgotObject=request.body;
    var isValidUserEmail=validate.email(forgotObject.Email);
    if(isValidUserEmail===true){
        dbOperations.checkEmail(request,response);
    }
    else{
        response.json({message:"fail"});
    }
});

///////Check Token
router.post('/passwordReset',function(request,response){
    logger.debug('routes forgotpass passwordReset');
    var passwordObject=request.body;
    var isValidUserEmail=validate.email(passwordObject.UserEmail);
    var isValidToken=validate.string(passwordObject.Token);
    var isValidPassword;
    if(passwordObject.NewPassword!=undefined){
        isValidPassword=validate.password(passwordObject.NewPassword);
        if(isValidUserEmail===true && isValidToken===true && isValidPassword===true){
            dbOperations.passwordReset(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else if(isValidUserEmail===true && isValidToken===true){
        dbOperations.passwordReset(request,response);
    }
    else{
        response.json({message:"fail"});
    }
});

module.exports = router;