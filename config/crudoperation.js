'use strict';

const User = require("./schemadefine");
const utils =require("./utils");

const dbOperations= {

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
        if(result[0]!=undefined){
            console.log("found");
            response.json({message:"EmailTaken"});
        }
        else
        {
            console.log("notfound1");
            var obj={
                "username":userObject.username,
                "notFound":undefined
            };
            that.checkUsername(obj,function(){
                console.log("njjj3",obj.notFound);
                if(obj.notFound==true){
                
                    that.addUser(request,response);
                }
                else{
                    response.json({message:"UsernameTaken"});
                }
            });
        }
   }
});
}    
,

////////Checking if username exists   
checkUsername:function (object,callback){

    User.find({"username":object.username},function(error,result){
    if(error){
       console.log("Error Occured",error);
    }
    else{ 
        if(result[0]!=undefined){
            
            console.log("found");
            object.notFound=false;
        }
        else
        {
            object.notFound=true;
            console.log("notfound2",object.notFound);
        }
    }
    callback();
});
}    
,   
/////////////Adding new user
addUser:function(request,response){
   var data =request.body;

   const encrypt=require('./encrypt');
   var salt=encrypt.genRandomString(16);
   var encryptedData=encrypt.sha512(data.password1,salt);

   data.password1=encryptedData.hash;
   data.salt=encryptedData.salt;

   data.registrationdate=new Date();
   data.emailverified=false;
   User.create(data,function(error,result){
    
   if(error){
       console.log("Error Occured",error);
   }
    else{
        result=[result];
        utils.FillSession(request,result);
        console.log("eee",result,result[0].useremail);
        SendLink(result[0].useremail,"emailactivate","emailactivationtoken");
        response.json({message:"pass"});
        console.log(result);
   }
});
}
,
/////////////////////Login////////////////
doLogin:function (request,response){
    
    var loginObject=request.body;
    User.find({
        "$or": [{
                "useremail":loginObject.loginid
            }, 
            {
                "username": loginObject.loginid
            }]
        
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
            const encrypt=require('./encrypt');
            var salt=result["0"].salt;
            var encryptedData=encrypt.sha512(loginObject.loginpassword,salt);

            loginObject.loginpassword=encryptedData.hash;
            if(result["0"].password1===loginObject.loginpassword){
                result["0"].rememberMe=loginObject.rememberMe;
                utils.FillSession(request,result);
                response.json({msg:"success"});   
            }
            else{
                response.json({msg:"fail"});
            }  
        }  
   }
});

}
,

////////////////Updating user Profile//////////////////////
//Updating username
    ChangeUsername:function(request,response){
        var that=this; 
        var UsernameObject=request.body;
        var newSession=request.session.user;
        var userEmail= newSession["0"].useremail;
        console.log("dddd",UsernameObject,newSession,userEmail);
        
        var obj={
            "username":UsernameObject.Username,
            "notFound":undefined
        };
        that.checkUsername(obj,function(){
            console.log("vvvv",obj.notFound);
            if(obj.notFound==true){
                User.update({"useremail":userEmail}, 
                {
                    $set:{
                        "username":obj.username
                    }
                },
                function(error,result){
                    if(error){
                        console.log("Error Occured",error);
                    }
                    else{ 
                        newSession[0].username=obj.username;
                        utils.FillSession(request,newSession);
                        response.json({message:"success"});
                    }
                });
            }
            else{
                response.json({message:"taken"});
            }
        });      
    },



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
       utils.FillSession(request,newSession);
       response.json({message:"success"});
    }
});
}, 
//////Checking old password
CheckPassword:function (request,response){
    var that=this;
    var passwordObject=request.body;
    var userName=request.session.user["0"].username;
  
    User.find({
        "username":userName 
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
            const encrypt=require('./encrypt');
            var salt=result["0"].salt;
            var encryptedData=encrypt.sha512(passwordObject.oldpassword,salt);

            passwordObject.oldpassword=encryptedData.hash;
            if(result["0"].password1===passwordObject.oldpassword){
                that.SetNewPassword(request,response);
            }
            else{
                response.json({message:"fail"});
            }  
        }  
    }
});
},
//////////////Setting new password
SetNewPassword:function (request,response){
    var passwordObject=request.body;

    const encrypt=require('./encrypt');
    var salt=encrypt.genRandomString(16);
    var encryptedData=encrypt.sha512(passwordObject.password1,salt);

    passwordObject.password1=encryptedData.hash;
    passwordObject.salt=encryptedData.salt;

    var userName=request.session.user["0"].username;
    console.log("dddd",passwordObject.password1,userName);
  
    User.update({
        "username":userName
    }, 
    {
        $set:{
            "password1":passwordObject.password1,
            "salt":passwordObject.salt
        }
    },function(error,result){
     if(error){
        console.log("Error Occured",error);
    }
     else{ 
       response.json({message:"success"});
    }
});
},


////////////////Email activation//////////////////
/////////Send email activation link
    SendActivationLink:function(request,response){
        var Email=request.body.Email;
        SendLink(Email,"emailactivate","emailactivationtoken");
        response.json({msg:"success"});
    },

////////Checking token for activation
checkToken:function(request,response){
    var that=this;
    var activationObject=request.body;

    User.find({
     "$and":[
        {
            "useremail":activationObject.userEmail
        }, 
         {
             "emailactivationtoken":activationObject.token
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
            that.ActivateEmail(activationObject.userEmail,response);
        }
     } 
    });
},

//////////Activating email
    ActivateEmail:function (userEmail,response){
        User.update({
            "useremail":userEmail
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
                response.json({message:"success"});
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
            if(result[0]!=undefined){
                console.log("found");
                SendLink(ForgotObject.Email,"forgotpassword","forgotpasswordtoken");
            response.json({msg:"LinkSent"});
            }
            else
                {
                    console.log("notfound");
                    response.json({msg:"Email nOt found"});
                }
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
                    response.json({msg:"pass"});
            }
        } 
        });
    },   
/////////Saving new password
    SaveNewPassword:function (request,response){
        
        var newPasswordObject=request.body;

        const encrypt=require('./encrypt');
        var salt=encrypt.genRandomString(16);
        var encryptedData=encrypt.sha512(newPasswordObject.NewPassword,salt);

        newPasswordObject.NewPassword=encryptedData.hash;
        newPasswordObject.salt=encryptedData.salt;

        User.update({
            "useremail":newPasswordObject.UserEmail
        },
        {
            $set:{
                "password1":newPasswordObject.NewPassword,
                "salt":newPasswordObject.salt,
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
/////////////Mobile Number Verifiction and adding to profile//////////
////Send Sms
    SendVerificationCode:function(request,response){
        var MobileObject=request.body;
        var Session=request.session.user;
        var UserEmail= Session["0"].useremail;
        var number=MobileObject.CountryCode+MobileObject.MobileNumber;
        var code=utils.RandomStringGenerate(6);
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
                utils.SendSms(number,body);
                response.json({message:"success"});
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
                utils.FillSession(request,newSession);
                response.json({message:"pass"});
        
            }
        });
    },

//////////////////Social Signin//////////////////////////
///////////Check if user exists
    SocialSignin:function(request,response){
        var that=this;
        var SocialObject=request.body;
        
        User.find({
            "useremail":SocialObject.Email
        }
        ,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else if(result){
                if(result[0]==undefined){
                    that.SocialRegister(request,response);

                }
                else{
                    utils.FillSession(request,result);
                    response.json({message:"Logged In"});
                }
            };
        })
    },   
/////////////Register new User
    SocialRegister:function(request,response){
        var SocialObject =request.body;
        var UserData={};
        UserData.userinfo={};
        UserData.useremail=SocialObject.Email;
        UserData.username=SocialObject.Email;
        UserData.password1="social";
        UserData.role="customer";
        UserData.registrationdate=new Date();
        UserData.userinfo.fullname=SocialObject.FullName;
        UserData.emailverified=true;
        UserData.socialconnection=SocialObject.Social;
        
        console.log("Social",UserData);

        User.create(UserData,function(error,result){
            if(error){
                response.json({message:"Can't Add Error Occured, Try later"});
            }
            else{
                result=[result];
                utils.FillSession(request,result);
                //console.log("eee",result,result[0].useremail);
                response.json({message:"Registered"});
            }

        });
    },
    

};

module.exports =dbOperations; 

function SendLink(UserEmail,Page,TokenType){
    const config =require("./config");
    var RandomToken=utils.RandomStringGenerate(32);
    var Query={};
    if(TokenType==="forgotpasswordtoken"){
        Query["passwordtokenstamp"]=new Date();
    }
    Query[TokenType]=RandomToken;
    var Url= config.reqUrl+"/#/"+Page+"?e="+UserEmail+"&t="+RandomToken;

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
            utils.SendMail(UserEmail,"sub",Url);
        }
    });

};
