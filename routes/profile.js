'use strict';

///Routing for profile factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/profile");
const commonOperations=require("../config/crudoperations/commonoperations");
const validate =require("../config/validate");
const multer = require('multer');
const logger = require("../config/logger");

var picStorage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, "./public/User_data");
    },
    filename: function (request, file, callback) {
        callback(null,request.uploadEmail+"profile.jpeg");
    }
});

var uploadPic = multer({ 
    storage: picStorage,
    limits: { fileSize: 1000000 },
    fileFilter: function (request, file, cb) {
        if (file.mimetype != 'image/jpeg' && file.mimetype != 'image/png') {
            request.fileValidationError = true;
            return cb(null, false, new Error('Invalid file type'));
        }
        cb(null, true);
    }
}).single('file');

// serverside file validation{
// limits - object - Various limits on incoming data. Valid properties are:

// fieldNameSize - integer - Max field name size (in bytes) (Default: 100 bytes).

// fieldSize - integer - Max field value size (in bytes) (Default: 1MB).

// fields - integer - Max number of non-file fields (Default: Infinity).

// fileSize - integer - For multipart forms, the max file size (in bytes) (Default: Infinity).

// files - integer - For multipart forms, the max number of file fields (Default: Infinity).

// parts - integer - For multipart forms, the max number of parts (fields + files) (Default: Infinity).

// headerPairs - integer - For multipart forms, the max number of header key=>value pairs to parse Default: 2000 (same as node's http).

// }

var callUpload = function (request, response) {
    request.fileValidationError = false;
    try {
        uploadPic(request, response, function (error) {
            if (error) {
                logger.error(error);
                response.json({ message: "fail" });
            } else if (request.fileValidationError === true) {
                logger.error("request.fileValidationError", request.fileValidationError);
                response.json({ message: "fail" });
            }
            else {
                response.json({ message: "success" });
            }
        })
    }
    catch (error) {
        logger.error(error);
    }
};


router.post('/uploadPic', function(request, response) {
    logger.debug('routes profile uploadPic');
    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }
    
    if(webSessionExist===true){
        request.uploadEmail =  request.session.user.useremail;
        callUpload(request, response);
    }
    else if(isValidSessionid===true){
        var userData={};
        commonOperations.getProfileData(request.body.sessionid,userData,function(userData){
            if(userData!=undefined){
                request.uploadEmail = userData.useremail;
                callUpload(request, response);
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
    logger.debug('routes profile changeUsername');
   
    var isValidSessionid=false;
    var webSessionExist=false;

    if(request.body.appCall===true && request.body.sessionid!=undefined){
        isValidSessionid=validate.string(request.body.sessionid);
    }
    else if(request.session.user){
        webSessionExist=true;
    }
    
    request.body.Username=request.body.Username.toLowerCase();
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
    logger.debug('routes profile updateProfileData');
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
    logger.debug('routes profile updateMobile');

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
    logger.debug('routes profile verifyCode');

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
    logger.debug('routes profile setNewPassword');

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