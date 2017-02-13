var User = require("./schemadefine");
var Utils =require("./utils");
var Config =require("./config");

var dbOperations= {

////////////////Adding new user//////////////////////////
////////Checking if email exists
checkUser:function (request,response){
    var that=this;
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
                that.checkUsername(request,response);
                
            }
        //response.json({result});
        
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,

////////Checking if username exists   
checkUsername:function (request,response){
    var that=this;
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
                that.addUser(request,response);
            }
        //response.json({msg:"Logged in SuccessFully..."});
       //loginObject.logintoken=true;
        //return loginObject.logintoken;
   }
});
}    
,   
/////////////Adding new user
addUser:function(request,response){

   var data =request.body;
   data.registrationdate=new Date();
   data.emailverified=false;
   User.create(data,function(error,result){
    
     //User.create({"name":"Ram","phone":[2222,3333],"address":[{"state":"Delhi","pincode":2222},{"state":"Delhi","pincode":2222}]},function(error,response){
   if(error){
       response.json({"msg":"Can't Add Error Occured, Try later"});
   }
    else{
        result=[result];
        Utils.FillSession(request,result);
        console.log("eee",result,result[0].useremail);
        SendLink(result[0].useremail,"emailactivate","emailactivationtoken");
        response.json({"msg":"pass"});
        console.log(result);
   }

});
}
,
/////////////////////Login////////////////
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
            //var string=Utils.RandomStringGenerate();
            //Utils.SendMail("hc160160@gmail.com","This is myyy subject",string);
            response.json({msg:"success"});
            
            //response.send("session is "+request.session.zzzzz);
        }
        
        //response.json({msg:"Logged in SuccessFully..."});
       
   }
});
}
,
////////////////Updating user Profile//////////////////////
////updating info
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
//////Checking old password
CheckPassword:function (request,response){
    var that=this;
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
           that.SetNewPassword(request,response);
            //response.json({msg:"success"});
        }

       
    }
});
},
//////////////Setting new password
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

////////////////Email activation//////////////////
/////////Send email activation link
    SendActivationLink:function(request,response){
        var Email=request.body.Email;
        SendLink(Email,"emailactivate","emailactivationtoken");
        response.json({"msg":"success"});
    },

////////Checking token for activation
CheckToken:function(request,response){
    var that=this;
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
            that.ActivateEmail(ActivationObject.UserEmail,response);
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


//////////Activating email
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

    //To show activation status
    CheckActivation:function (Status,response){
        User.find({
            "useremail":Status.Email
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
                    Status.ActivationStatus=result[0].emailverified;
                    response.send(Status);
                }

       
        }
        });
    },
/////////////Resetting Password////////////////////////////////////
/////Sending link with token
    checkEmail:function (request,response){
    
        var ForgotObject =request.body;
        console.log("here");
        User.find({"useremail":ForgotObject.Email},function(error,result){
        if(error){
            console.log("Error Occured",error);
        }
        else{ 
            
        console.log(result);
            //console.log(result[0].useremail);
        //console.log(result.username); 
            if(result[0]!=undefined){
                console.log("found");
                //response.json({msg:"LinkSent"});
                SendLink(ForgotObject.Email,"forgotpassword","forgotpasswordtoken");
            response.json({msg:"LinkSent"});
            }
            else
                {
                    console.log("notfound");
                    response.json({msg:"Email nOt found"});
                }
            //response.json({result});
            
            //response.json({msg:"Logged in SuccessFully..."});
        //loginObject.logintoken=true;
            //return loginObject.logintoken;
        }
        });
    }, 

/////checking token
    PasswordReset:function(request,response){
        var PasswordObject=request.body;
        
        User.find({
        "$and":[
            {
                "useremail":PasswordObject.UserEmail
            }, 
            {
                "forgotpasswordtoken":PasswordObject.Token
            }
        ]
        }
        ,function(error,result){
        if(error){
            console.log("Error Occured",error);
        }
        else{ 
            
            var date=new Date();
            
            if(result.length<1){
                response.json({msg:"fail"});
            }
            else if((Math.abs(date-result[0].passwordtokenstamp))>86400000){
                response.json({msg:"fail"});
            }
            else{
                // var object{
                //     "Fieldto"
                // }
                
                    response.json({msg:"pass"});
            }

        } 
        });

    },   
/////////Saving new password
    SaveNewPassword:function (request,response){
        
        var NewPasswordObject=request.body;
        console.log("xyyy",NewPasswordObject);
        User.update({
            "useremail":NewPasswordObject.UserEmail
        },
        {
            $set:{
                "password1":NewPasswordObject.NewPassword,
                "emailverified":true,
                "forgotpasswordtoken":undefined,
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
/////////////Mobile Number Verifiction//////////
////Send Sms
    SendVerificationCode:function(request,response){
        var MobileObject=request.body;
        var Session=request.session.user;
        var UserEmail= Session["0"].useremail;
        var number=MobileObject.CountryCode+MobileObject.MobileNumber;
        var code=Utils.RandomStringGenerate(6);
        //var code = Math.floor((Math.random()*999999)+111111);
        var body='Your verification code is '+code;
        //sms is sent even if the useris not found
        User.update({
            "useremail":UserEmail
        }, 
        {
            $set:{
                "temporarymobile":number,
                "mobileverificationcode":code
            }
        },
        function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                console.log(UserEmail,result);
                Utils.SendSms(number,body);
                response.json({"msg":"success"});
            }
        });
    },

    VerifyCode:function(request,response){
        var that=this;
        var Session=request.session.user;
        var UserEmail= Session["0"].useremail;
        var CodeObject=request.body;
        
        User.find({
        "$and":[
            {
                "useremail":UserEmail
            }, 
            {
                "mobileverificationcode":CodeObject.VCode
            }
        ]
        }
        ,function(error,result){
        if(error){
            console.log("Error Occured",error);
        }
        else{ 
 
            if(result.length<1){
                response.json({message:"fail"});
            }
            else{
                that.SetMobile(result,request,response);
                //response.json({msg:"pass"});
            }

        } 
        });

    },   

    SetMobile:function(result,request,response){
        var CodeObject=request.body;
        var TemporaryMobile=result[0].temporarymobile;
        var newSession=request.session.user;
        var UserEmail= newSession["0"].useremail;
        console.log("xyyy",CodeObject,UserEmail);
        User.update({
            "useremail":UserEmail
        },
        {
            $set:{
                "mobile":TemporaryMobile,
                "temporarymobile":undefined,
                "mobileverificationcode":undefined,
            }
        },function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
            
                console.log(result);
                newSession[0].mobile=TemporaryMobile;
                Utils.FillSession(request,newSession);
                response.json({message:"pass"});
        
            }
        });
    },

//////////////////Google Signin//////////////////////////
///////////Check if user exists
    GoogleSignin:function(request,response){
        var that=this;
        var GoogleObject=request.body;
        
        User.find({
            "useremail":GoogleObject.Email
        }
        ,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else if(result){
                if(result[0]==undefined){
                    that.GoogleRegister(request,response);

                }
                else{
                    Utils.FillSession(request,result);
                    response.json({"message":"Logged In"});
                }
            };
        })
    },   
/////////////Register new User
    GoogleRegister:function(request,response){
        var GoogleObject =request.body;
        var UserData={};
        UserData.userinfo={};
        UserData.useremail=GoogleObject.Email;
        UserData.username=GoogleObject.Email;
        UserData.password1="google";
        UserData.role="customer";
        UserData.registrationdate=new Date();
        UserData.userinfo.fullname=GoogleObject.FullName;
        UserData.emailverified=true;
        
        console.log("google",UserData);

        User.create(UserData,function(error,result){
            if(error){
                response.json({"message":"Can't Add Error Occured, Try later"});
            }
            else{
                result=[result];
                Utils.FillSession(request,result);
                //console.log("eee",result,result[0].useremail);
                response.json({"message":"Registered"});
            }

        });
    },
    

};

module.exports =dbOperations; 

function SendLink(UserEmail,Page,TokenType){

    var RandomToken=Utils.RandomStringGenerate(32);
    var Query={};
    if(TokenType==="forgotpasswordtoken"){
        Query["passwordtokenstamp"]=new Date();
    }
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
