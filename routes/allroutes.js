var express = require('express');
var router = express.Router();
var dbOperations = require("../config/crudoperation");

/* GET users listing. */
// router.post('/checklogin', function(req, res, next) {
//   //res.send('Welcome '+req.body.userid+" "+req.body.password);
//    var xxxxcccc;
//     req.session.ui="kkk";
// console.log("session is "+req.session.ui);
//     res.send("session is "+req.session.ui);

// });

router.post('/webindex', function(request,response) {
  if(request.session.user){
       response.send("Hello "+request.session.user["0"].username);
  }
  else{
       response.send("Login/SignUp");
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
    
    //var data =request.body;
    //console.log("DATA is      ",data);
    dbOperations.checkUser(request,response);
 
    //dbOperations.addUser(data,response);
});

router.post('/login',function(request,response){
   // var data =request.body;
    //console.log("DATA is      ",data);
    dbOperations.doLogin(request,response);
    //response.redirect('http://localhost:1234/#/profile');
});

router.post('/UpdateProfileData',function(request,response){
    //var data=request.body;
    //console.log("bbbb");
    //response.send(data);
    dbOperations.UpdateProfileData(request,response);
});

router.post('/redirect',function(request,response){

    var url=request.body;
    console.log("url is"+url);
    response.writeHead(301,
    {
        Location: ""}
    );
    response.end();

});

router.post('/fpass',function(request,response){
   
    
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.sendCode(data,response);
    
    //return logintoken;
});


module.exports = router;
