var express = require('express');
var router = express.Router();
var dbOperations = require("../config/crudoperation");

/* GET users listing. */
router.post('/checklogin', function(req, res, next) {
  res.send('Welcome '+req.body.userid+" "+req.body.password);
});

router.post('/register',function(request,response){
    
    console.log("Im here post");
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.checkUser(data,response);
    
    
    //dbOperations.addUser(data,response);
});

router.post('/login',function(request,response){
   
    var dbOperations = require("./crudoperation");
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.doLogin(data,response);
    
    //return logintoken;
});

router.post('/fpass',function(request,response){
   
    var dbOperations = require("./crudoperation");
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.sendCode(data,response);
    
    //return logintoken;
});


module.exports = router;
