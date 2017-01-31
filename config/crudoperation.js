var User = require("./schemadefine");
var Utils =require("./utils");
var Config =require("./config");

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
   data.registrationdate=new Date();
   User.create(data,function(error,result){
    
     //User.create({"name":"Ram","phone":[2222,3333],"address":[{"state":"Delhi","pincode":2222},{"state":"Delhi","pincode":2222}]},function(error,response){
   if(error){
       response.json({"msg":"Can't Add Error Occured, Try later"});
   }
    else{
        result=[result];
        Utils.FillSession(request,result);
        console.log("eee",result,result[0].useremail);
        SendLink(result[0].useremail,"emailactivationtoken","emailactivate");
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
            Utils.FillSession(request,result);
            //request.session.zzzzz="mymail";
            // console.log("session is "+request.session.zzzzz);
            var string=Utils.RandomStringGenerate();
            Utils.SendMail("hc160160@gmail.com","This is myyy subject",string);
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
       Utils.FillSession(request,newSession);
       //console.log(newSession);
       response.json({result});
       
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

CheckToken:function(request,response){
    var ActivationObject=request.body;

    User.find({
     "$and":[
        {
            "useremail":ActivationObject.UserEmail
        }, 
         {
             "emailactivationtoken":ActivationObject.Token
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
            response.json({msg:"NotFound"});
        }
        else{
            // var object{
            //     "Fieldto"
            // }
            caller.ActivateEmail(ActivationObject.UserEmail,response);
            //response.json({msg:"success"});
        }

     } 
    });

},
/*
UpdateDB:function(object,response){
    var Objectz=object.body;
    console.log("dddd",Objectz.Token);
    User.findOneAndUpdate({query:{"useremail":"hc160160@gmail.com"},update:{$set:{"password1":"uuuu"}}}
    // User.findAndModify({
    //         query:{
    //             // "$and":[{
    //                  "useremail":"hc160160@gmail.com"
    //             // },
    //             //{
    //              //   "emailactivationtoken":Objectz.Token
    //             //}
    //             //]
    //         },
    //         update:
    //         {
    //             $set:{
    //               "password1":"Itried"
    //             //  "username":"noididnt"
    //             }
    //         } 
    //     }
        ,function(error,result){
            comsole.log('bbbb');
            if(error){
            console.log("Error Occured",error);
            response.json({msg:"success"});
            }
            else{ 
                console.log(result);
                mongoose.connection.close();
                response.json({msg:"success"});
                
            }
    });
},
*/



    ActivateEmail:function (UserEmail,response){
        
        console.log("xxxx",UserEmail);
        User.update({
            "useremail":UserEmail
        },
        {
            $set:{
                "emailverified":true,
                "emailactivationtoken":undefined
            }
        },function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
            
                console.log(result);
                response.json({msg:"success"});
        
            }
        });
    },  

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
    ActivateEmail:function (UserEmail,response) {
        dbOperations.ActivateEmail(UserEmail,response);
    },

};

function SendLink(UserEmail,TokenType,Page,response){

    var RandomToken=Utils.RandomStringGenerate();
    var Query={};
    Query[TokenType]=RandomToken;
    var Url= Config.reqUrl+"/#/"+Page+"?e="+UserEmail+"&t="+RandomToken;

    User.update({
        "useremail":UserEmail
    }, 
    {
        $set:Query
    },
    function(error,result){
        if(error){
            console.log("Error Occured",error);
        }
        else{ 
            console.log("succ");
            Utils.SendMail(UserEmail,"sub",Url);
        }
    });
};


