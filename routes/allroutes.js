'use strict';

const express = require('express');
const router = express.Router();
const dbOperations = require("../config/crudoperation");
const utils = require("../config/utils");
const validate =require("../config/validate");


router.post('/webindex', function(request,response) {
  if(request.session.user){
      var Status={
          "Message":"Hello "+request.session.user["0"].username,
          "Email":request.session.user["0"].useremail,
         
      }
      dbOperations.CheckActivation(Status,response);
  }
  else{
    var Status={
          "Message":"Login/SignUp",
      }
       response.send(Status);
  }
});

router.post('/register',function(request,response){
    dbOperations.checkUser(request,response);
});

router.post('/login',function(request,response){
    dbOperations.doLogin(request,response);
});

////////////Profile Page Routes/////////////////////
///////////Show Profile Data
router.post('/getData', function(request,response) {
  if(request.session.user){
       response.send(request.session.user);
  }
  else{
       response.send("unknown");
  }
});
////////////Edit/Update profile data
router.post('/UpdateProfileData',function(request,response){
    if(request.session.user){
        dbOperations.UpdateProfileData(request,response);
      }
    else{
       response.json({"message":"unknown"});
    }
});
/////////////Change Username
router.post('/ChangeUsername',function(request,response){
    if(request.session.user){
        dbOperations.ChangeUsername(request,response);
      }
    else{
       response.json({"message":"unknown"});
    }
});
////////////Mobile no. verification
router.post('/UpdateMobile',function(request,response){
    if(request.session.user){
        dbOperations.SendVerificationCode(request,response);
      }
    else{
       response.json({"message":"unknown"});
    }
});

router.post('/VerifyCode',function(request,response){
    if(request.session.user){
        dbOperations.VerifyCode(request,response);
      }
    else{
       response.json({"message":"unknown"});
    }
});
////////////Change Password
router.post('/SetNewPassword',function(request,response){
    if(request.session.user){
        dbOperations.CheckPassword(request,response);
      }
    else{
       response.json({"message":"unknown"});
    }
});

///////////////////////////////////////////

router.post('/activateEmail',function(request,response){
    var activationObject=request.body;
    var isValidUserEmail=validate.email(activationObject.userEmail);
    var isValidToken=validate.string(activationObject.token);
    if(isValidUserEmail===true && isValidToken===true){
        dbOperations.checkToken(request,response);
    }
    else{
        response.json({message:"fail"});
    }
});

router.post('/SendLink',function(request,response){
    dbOperations.checkEmail(request,response);
});

router.post('/PasswordReset',function(request,response){
    dbOperations.PasswordReset(request,response);
});

router.post('/SaveNewpassword',function(request,response){
    dbOperations.SaveNewPassword(request,response);
});

router.post('/SendActivationLink',function(request,response){
    dbOperations.SendActivationLink(request,response);
});

router.post('/Logout',function(request,response){
    utils.SessionDestroy(request);
    response.send({message:"success"});
});

/////////////Social SignIn/////////////////
router.post('/SocialSignin',function(request,response){
    dbOperations.SocialSignin(request,response);
});

////////////CheckUsername if already exists////////////////
router.post('/checkUsername',function(request,response){
    var usernameObj=request.body;
    usernameObj.notFound=undefined;
    dbOperations.checkUsername(usernameObj,function(){
        if(usernameObj.notFound==true){
            response.json({"message":"notfound"});
        }
        else{
            response.json({"message":"found"});
        }
    });
});


module.exports = router;

/*res.send("session is "+req.session.ui);
    //var data=request.body;
    //console.log("bbbb",data);
    //response.send(data);
router.post('/redirect',function(request,response){

    var url=request.body;
    console.log("url is"+url);
    response.writeHead(301,
    {
        Location: ""}
    );
    response.end();

});

*/


