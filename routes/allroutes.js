var express = require('express');
var router = express.Router();
var dbOperations = require("../config/crudoperation");
var Utils = require("../config/utils")


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

router.post('/getData', function(request,response) {
  if(request.session.user){
       response.send(request.session.user);
  }
  else{
       response.send("unknown");
  }
});

router.post('/register',function(request,response){
    dbOperations.checkUser(request,response);
});

router.post('/login',function(request,response){
    dbOperations.doLogin(request,response);
});

router.post('/UpdateProfileData',function(request,response){
    dbOperations.UpdateProfileData(request,response);
});

router.post('/SetNewPassword',function(request,response){
    dbOperations.CheckPassword(request,response);
});

router.post('/ActivateEmail',function(request,response){
    dbOperations.CheckToken(request,response);
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
    Utils.SessionDestroy(request);
    response.send({msg:"success"});
});

////////////Mobile no. verification///////////////////////
router.post('/UpdateMobile',function(request,response){
    dbOperations.SendVerificationCode(request,response);
});

router.post('/VerifyCode',function(request,response){
    dbOperations.VerifyCode(request,response);
});
/////////////Social SignIn/////////////////
router.post('/SocialSignin',function(request,response){
    dbOperations.SocialSignin(request,response);
});
///////////////////////////////////////////////////////////

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


