'use strict';

///Routing for profile factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/profile");
const validate =require("../config/validate");

///////////Show Profile Data
router.post('/getData', function(request,response) {
  if(request.session.user){
       response.send(request.session.user);
  }
  else{
       response.send("unknown");
  }
});

/////////////Change Username
router.post('/changeUsername',function(request,response){
    if(request.session.user){
        var usernameObject=request.body;
        var isValidUsername=validate.username(usernameObject.Username);
        if(isValidUsername===true){
            dbOperations.changeUsername(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else{
       response.json({message:"unknown"});
    }
});

////////////Edit/Update profile data
router.post('/updateProfileData',function(request,response){
    if(request.session.user){
        var profileObject=request.body;
        var isValidName=validate.name(profileObject.fullname);
        var isValidArea=validate.string(profileObject.area);
        var isValidCity=validate.string(profileObject.city);
        var isValidState=validate.string(profileObject.state);
        var isValidPincode=validate.number(profileObject.pincode);
        var isValidCountry=validate.string(profileObject.country);
        if(isValidName===true && isValidArea===true && isValidCity===true && isValidState===true 
        && isValidPincode===true && isValidCountry===true){
            dbOperations.updateProfileData(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else{
       response.json({message:"unknown"});
    }
});

////////////Mobile no. verification
/////Send Code
router.post('/updateMobile',function(request,response){
    if(request.session.user){
        var mobileObject=request.body;
        var isValidCountryCode=validate.code(mobileObject.CountryCode);
        var isValidMobile=validate.mobile(mobileObject.MobileNumber);
        if(isValidCountryCode===true && isValidMobile===true){
            dbOperations.sendVerificationCode(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else{
       response.json({message:"unknown"});
    }
});

//////////////Verify Code
router.post('/verifyCode',function(request,response){
    if(request.session.user){
        var codeObject=request.body;
        var isValidCode=validate.code(codeObject.VCode);
        console.log(isValidCode);
        if(isValidCode===true){
            console.log(isValidCode);
            dbOperations.verifyCode(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else{
       response.json({message:"unknown"});
    }
});

////////////Change Password
router.post('/setNewPassword',function(request,response){
    if(request.session.user){
        var passwordObject=request.body;
        var isValidOldPassword=validate.password(passwordObject.oldpassword);
        var isValidNewPassword=validate.password(passwordObject.password1);
        if(isValidOldPassword===true && isValidNewPassword===true){
            dbOperations.checkPassword(request,response);
        }
        else{
            response.json({message:"fail"});
        }
    }
    else{
       response.json({message:"unknown"});
    }
});

module.exports = router;