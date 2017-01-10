var express = require('express');
var router = express.Router();
var dbOperations = require("../config/crudoperation");

/* GET users listing. */
router.post('/checklogin', function(req, res, next) {
  //res.send('Welcome '+req.body.userid+" "+req.body.password);
   var xxxxcccc;
    req.session.ui="kkk";
console.log("session is "+req.session.ui);
    res.send("session is "+req.session.ui);

});

router.post('/register',function(request,response){
    
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.checkUser(data,response);
 
    //dbOperations.addUser(data,response);
});

router.post('/login',function(request,response){
   
    
   // var data =request.body;
    //console.log("DATA is      ",data);

    dbOperations.doLogin(request,response);
                request.session.zzzzz="mymail";
            console.log("session is "+request.session.zzzzz);
    //console.log("session is "+req.session.ui);
    //return logintoken;
});

router.post('/fpass',function(request,response){
   
    
    var data =request.body;
    console.log("DATA is      ",data);
    dbOperations.sendCode(data,response);
    
    //return logintoken;
});


module.exports = router;
