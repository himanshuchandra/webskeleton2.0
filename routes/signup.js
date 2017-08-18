'use strict';

///Routing for register factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/signup");
const validate =require("../config/validate");
const logger = require("../config/logger");

////User registration
router.post('/registerUser',function(request,response){
    logger.debug('routes signup signup');
    request.body.useremail=request.body.useremail.toLowerCase();
    request.body.username=request.body.username.toLowerCase();
    var userObject=request.body;
    var isValidUserEmail=validate.email(userObject.useremail);
    var isValidUsername=validate.username(userObject.username);
    var isValidPassword=validate.password(userObject.password1);
    var isValidRole=validate.string(userObject.role);
    if(isValidUserEmail===true && isValidUsername===true && isValidPassword===true && isValidRole===true){
        dbOperations.checkUser(request,response);
    }
    else{
        response.json({message:"fail"});
    }
});

module.exports = router;