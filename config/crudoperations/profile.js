'use strict';

const User = require("../schemadefine");
const utils =require("../utils");
const commonOperations=require("./commonoperations");

const dbOperations={

    //Updating username
    changeUsername:function(request,response){
        var UsernameObject=request.body;
        var newSession=request.session.user;
        var userEmail= newSession.useremail;
        
        var obj={
            "username":UsernameObject.Username,
            "notFound":undefined
        };
        commonOperations.checkUsername(obj,function(){
            if(obj.notFound===true){
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
                        newSession.username=obj.username;
                        utils.fillWebSession(request,newSession);
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
    updateProfileData:function (request,response){
        var profileObject=request.body;
        var newSession=request.session.user;
        var userName= newSession.username;
    
        User.update({
            "username":userName
        }, 
        {
            $set:{
                "userinfo":profileObject
            }
        }
        ,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                newSession.userinfo=profileObject;
                utils.fillWebSession(request,newSession);
                response.json({message:"success"});
            }
        });
    }, 
    /////////////Mobile Number Verifiction 
    ////Send Sms
    sendVerificationCode:function(request,response){
        var MobileObject=request.body;
        var Session=request.session.user;
        var UserEmail= Session.useremail;
        var number=MobileObject.CountryCode+MobileObject.MobileNumber;
        var code=utils.randomStringGenerate(6);
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
                utils.sendSms(number,body);
                //need to be a callback function
                response.json({message:"success"});
            }
        });
    },

    ////verify code
    verifyCode:function(request,response){
        var that=this;
        var Session=request.session.user;
        var UserEmail= Session.useremail;
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
                    that.setMobile(result,request,response);
                }
            } 
        });
    },

    ////Updating Mobileno.
    setMobile:function(result,request,response){
        var CodeObject=request.body;
        var TemporaryMobile=result[0].temporarymobile;
        var newSession=request.session.user;
        var UserEmail= newSession.useremail;

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
                newSession.mobile=TemporaryMobile;
                utils.fillWebSession(request,newSession);
                response.json({message:"pass"});
            }
        });
    },

    //////Checking old password
    checkPassword:function (request,response){
        var that=this;
        var passwordObject=request.body;
        var userName=request.session.user.username;
        User.find({
            "username":userName 
        }
        ,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                if(result.length<1){
                    response.json({message:"notFound"});
                }
                else{
                    const encrypt=require('../encrypt');
                    var salt=result["0"].salt;
                    var encryptedData=encrypt.sha512(passwordObject.oldpassword,salt);

                    passwordObject.oldpassword=encryptedData.hash;
                    if(result["0"].password1===passwordObject.oldpassword){
                        that.setNewPassword(request,response);
                    }
                    else{
                        response.json({message:"fail"});
                    }  
                }  
            }
        });
    },
    //////////////Setting new password
    setNewPassword:function (request,response){
        var passwordObject=request.body;

        const encrypt=require('../encrypt');
        var salt=encrypt.genRandomString(16);
        var encryptedData=encrypt.sha512(passwordObject.password1,salt);

        passwordObject.password1=encryptedData.hash;
        passwordObject.salt=encryptedData.salt;

        var userName=request.session.user.username;
    
        User.update({
            "username":userName
        }, 
        {
            $set:{
                "password1":passwordObject.password1,
                "salt":passwordObject.salt
            }
        },
        function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                response.json({message:"success"});
            }
        });
    },
};

module.exports =dbOperations;