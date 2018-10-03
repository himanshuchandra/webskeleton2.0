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
    
    request.uploadEmail =  request.userData.useremail;
    callUpload(request, response);

});

/////////////Change Username
router.post('/changeUsername',function(request,response){
    logger.debug('routes profile changeUsername');
   
    request.body.Username=request.body.Username.toLowerCase();
    var isValidUsername=validate.username(request.body.Username);

    if(isValidUsername){
        dbOperations.changeUsername(request,response,request.userData);
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Edit/Update profile data
router.post('/updateProfileData',function(request,response){
    logger.debug('routes profile updateProfileData');

    var profileObject=request.body;
    var isValidName=validate.name(profileObject.fullname);
    var isValidArea=validate.string(profileObject.area);
    var isValidCity=validate.string(profileObject.city);
    var isValidState=validate.string(profileObject.state);
    var isValidPincode=validate.number(profileObject.pincode);
    var isValidCountry=validate.string(profileObject.country);

    if(isValidName && isValidArea && isValidCity && isValidState && isValidPincode && isValidCountry){
        dbOperations.updateProfileData(request,response,request.userData);
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Mobile no. verification
/////Send Code
router.post('/updateMobile',function(request,response){
    logger.debug('routes profile updateMobile');

    var mobileObject=request.body;
    var isValidCountryCode=validate.code(mobileObject.CountryCode);
    var isValidMobile=validate.mobile(mobileObject.MobileNumber);
    
    if(isValidCountryCode && isValidMobile){
        dbOperations.sendVerificationCode(request,response,request.userData);
    }
    else{
        response.json({message:"unknown"});
    }
});

//////////////Verify Code
router.post('/verifyCode',function(request,response){
    logger.debug('routes profile verifyCode');

    var codeObject=request.body;
    var isValidCode=validate.code(codeObject.VCode);
    
    if(isValidCode){
        dbOperations.verifyCode(request,response,request.userData);
    }
    else{
        response.json({message:"unknown"});
    }
});

////////////Change Password
router.post('/setNewPassword',function(request,response){
    logger.debug('routes profile setNewPassword');

    var passwordObject=request.body;
    var isValidOldPassword=validate.password(passwordObject.oldpassword);
    var isValidNewPassword=validate.password(passwordObject.password1);

    if(isValidOldPassword && isValidNewPassword){
        dbOperations.checkPassword(request,response,request.userData);
    }
    else{
        response.json({message:"unknown"});
    }
});

module.exports = router;