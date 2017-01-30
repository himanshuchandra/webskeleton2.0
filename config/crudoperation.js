var User = require("./schemadefine");
var Utils =require("./utils");
var config =require("./config");

var dbOperations= {


checkUser:function (request,response){
    
    var userObject =request.body;
    User.find({"useremail":userObject.useremail},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");
            response.json({msg:"Email already registered"});
        }
        else
            {
                console.log("notfound");
                caller.checkusernamecaller(request,response);
            }
        //response.json({result});
        
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,   
checkUsername:function (request,response){
    var userObject =request.body;
    
    User.find({"username":userObject.username},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
      console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");
            response.json({msg:"Username is already taken"});
        }
        else
            {
                console.log("notfound");
                caller.registercaller(request,response);
            }
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,   
addUser:function(request,response){

   var data =request.body;
   User.create(data,function(error,result){
    
     //User.create({"name":"Ram","phone":[2222,3333],"address":[{"state":"Delhi","pincode":2222},{"state":"Delhi","pincode":2222}]},function(error,response){
   if(error){
       response.json({"msg":"Can't Add Error Occured, Try later"});
   }
    else{
        result=[result];
        fillSession(request,result);
        //Utils.SendMail();
        response.json({"msg":"Register SuccessFully..."});
        console.log(result);
   }

});
}
,
doLogin:function (request,response){
    
    var loginObject=request.body;
    User.find({
     "$and":[
        {
            "$or": [{
        "useremail":loginObject.loginid
        }, 
                       {
        "username": loginObject.loginid
        }]
        },
         {
             "password1":loginObject.loginpassword
         }
      ]
    },function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
       console.log(result);
        if(result.length<1){
            response.json({msg:"fail"});
        }
        else{
            result["0"].rememberMe=loginObject.rememberMe;
            fillSession(request,result);
            //request.session.zzzzz="mymail";
            // console.log("session is "+request.session.zzzzz);
            Utils.SendMail();
            response.json({msg:"success"});
            
            //response.send("session is "+request.session.zzzzz);
        }
        
        //response.json({msg:"Logged in SuccessFully..."});
       
   }
});
}
,

UpdateProfileData:function (request,response){
    var profileObject=request.body;
    var newSession=request.session.user;
    var userName= newSession["0"].username;
    console.log("dddd",profileObject,newSession,userName);
  
       User.update({"username":userName}, 
     {$set:{"userinfo":profileObject}},function(error,result){
     if(error){
        console.log("Error Occured",error);
    }
     else{ 
       newSession[0].userinfo=profileObject;
       fillSession(request,newSession);
       //console.log(newSession);
       response.json({msg:"success"});
       
    }
});
}, 

CheckPassword:function (request,response){
    var passwordObject=request.body;
    var userName=request.session.user["0"].username;
    console.log("dddd",passwordObject,userName);
  
    User.find({
     "$and":[
        {
            "username":userName
        }, 
         {
             "password1":passwordObject.oldpassword
         }
      ]
    }
   ,function(error,result){
     if(error){
        console.log("Error Occured",error);
    }
     else{ 
       console.log(result);
       if(result.length<1){
            response.json({msg:"fail"});
        }
        else{
            caller.SetNewPassword(request,response);
            //response.json({msg:"success"});
        }

       
    }
});
},

SetNewPassword:function (request,response){
    var passwordObject=request.body;
    var userName=request.session.user["0"].username;
    console.log("dddd",passwordObject.password1,userName);
  
    User.update({"username":userName}, 
     {$set:{"password1":passwordObject.password1}},function(error,result){
     if(error){
        console.log("Error Occured",error);
    }
     else{ 
       response.json({msg:"success"});
       
    }
});
}, 

sendCode:function (codeObject,response){
    

   
    User.find({"useremail":codeObject.cemail},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
        //console.log(result[0].useremail);
       //console.log(result.username); 
        if(result[0]!=undefined){
            console.log("found");

            var code = (Math.floor(100000 + Math.random() * 900000)).toString();
            code = Math.floor(code.substring(-2)/100);   
            if(code<1000)
            {
                code=code+1000;
            }

            codeObject.fcode=code;
            caller.savecode(codeObject,response);

        }
        else
            {
                console.log("notfound");
                response.json({msg:"Email not registered"});
            }
       
   }
});
},

forgotpass:function (codeObject,response){
    

  
    console.log(codeObject.fcode);
    User.update({useremail:codeObject.cemail}, {$set:{forgotpasscode:codeObject.fcode}},function(error,result){
    if(error){
       console.log("Error Occured",error);
   }
    else{ 
        
       console.log(result);
       response.json({msg:"found",code:codeObject.fcode});
       
   }
});
}  

};

module.exports =dbOperations; 

var caller={
    
    checkusernamecaller:function(request,response){
        dbOperations.checkUsername(request,response);
    },
    registercaller:function(request,response){
        dbOperations.addUser(request,response);
    },
    savecode:function(data,response){
        dbOperations.forgotpass(data,response);
    },
    SetNewPassword:function (request,response) {
        dbOperations.SetNewPassword(request,response);
    },

};

function fillSession(request,data) {
    
    //sessionDestroy(request);
    userData=data;
    userData["0"].password1=undefined;
    console.log(userData);
    //console.log(userData);
    //console.log(userData["0"].password1);
    //var userData=data;
    request.session.user=userData;
    if(userData["0"].rememberMe==true){
         var thirtyDays = 30*24*60*60*1000;
         request.session.cookie.expires = new Date(Date.now() + thirtyDays);
    }
    //console.log(data["0"].useremail);
};

function sessionDestroy(request){
     request.session.destroy(function(err) {
        console.log("cannot access session here"); 
    });
};


