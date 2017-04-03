'use strict';

///Routing for profile factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/profile");
const commonOperations=require("../config/crudoperations/commonoperations");
const validate =require("../config/validate");

/*Optional call if loading data from session
///////////Show Profile Data
router.post('/getData', function(request,response) {
    if(request.body.appCall===true && request.body.sessionid!=undefined){
        var isValidSessionid=validate.string(request.body.sessionid);
        if(isValidSessionid===true){
            var userData={};
            commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
                response.send(userData);
            });
        }
        else{
            response.send("unknown");
        }
    }
    else if(request.session.user){
        response.send(request.session.user);
    }
    else{
        response.send("unknown");
    }
});
*/
/////////////Change Username
router.post('/changeUsername',function(request,response){
   
    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }
    
    var isValidUsername=validate.username(request.body.Username);

    if(isValidUsername===true && webSessionExist===true){
        var userData=request.session.user;
        dbOperations.changeUsername(request,response,userData);
    }
    else if(isValidUsername===true && isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                dbOperations.changeUsername(request,response,userData);
            }
            else{
                response.json({message:"unknown"});
            }
        });
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Edit/Update profile data
router.post('/updateProfileData',function(request,response){
    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }

    var profileObject=request.body;
    var isValidName=validate.name(profileObject.fullname);
    var isValidArea=validate.string(profileObject.area);
    var isValidCity=validate.string(profileObject.city);
    var isValidState=validate.string(profileObject.state);
    var isValidPincode=validate.number(profileObject.pincode);
    var isValidCountry=validate.string(profileObject.country);

    if(isValidName===true && isValidArea===true && isValidCity===true && isValidState===true 
        && isValidPincode===true && isValidCountry===true && webSessionExist===true){
        var userData=request.session.user;
        dbOperations.updateProfileData(request,response,userData);
    }
    else if(isValidName===true && isValidArea===true && isValidCity===true && isValidState===true 
        && isValidPincode===true && isValidCountry===true && isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                dbOperations.updateProfileData(request,response,userData);
            }
            else{
                response.json({message:"unknown"});
            }
        });
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Mobile no. verification
/////Send Code
router.post('/updateMobile',function(request,response){

    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }

    var mobileObject=request.body;
    var isValidCountryCode=validate.code(mobileObject.CountryCode);
    var isValidMobile=validate.mobile(mobileObject.MobileNumber);
    
    if(isValidCountryCode===true && isValidMobile===true && webSessionExist===true){
        var userData=request.session.user;
        dbOperations.sendVerificationCode(request,response,userData);
    }
    else if(isValidCountryCode===true && isValidMobile===true && isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                dbOperations.sendVerificationCode(request,response,userData);
            }
            else{
                response.json({message:"unknown"});
            }
        });
    }
    else{
        response.json({message:"unknown"});
    }
});

//////////////Verify Code
router.post('/verifyCode',function(request,response){

    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }

    var codeObject=request.body;
    var isValidCode=validate.code(codeObject.VCode);
    
    if(isValidCode===true && webSessionExist===true){
        var userData=request.session.user;
        dbOperations.verifyCode(request,response,userData);
    }
    else if(isValidCode===true && isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                dbOperations.verifyCode(request,response,userData);
            }
            else{
                response.json({message:"unknown"});
            }
        });
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Change Password
router.post('/setNewPassword',function(request,response){

    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }

    var passwordObject=request.body;
    var isValidOldPassword=validate.password(passwordObject.oldpassword);
    var isValidNewPassword=validate.password(passwordObject.password1);

    if(isValidOldPassword===true && isValidNewPassword===true && webSessionExist===true){
        var userData=request.session.user;
        dbOperations.checkPassword(request,response,userData);
    }
    else if(isValidOldPassword===true && isValidNewPassword===true && isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                dbOperations.checkPassword(request,response,userData);
            }
            else{
                response.json({message:"unknown"});
            }
        });
    }
    else{
        response.json({message:"unknown"});
    }
});

module.exports = router;