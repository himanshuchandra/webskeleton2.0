'use strict';

const User = require("../schemadefine");
const utils =require("../utils");
const commonOperations=require("./commonoperations");

const dbOperations={

    //Updating username
    changeUsername:function(request,response,session){
        var UsernameObject=request.body;
        var userEmail= session.useremail;
        
        var obj={
            "username":UsernameObject.Username,
            "notFound":undefined
        };
        commonOperations.checkUsername(obj,function(){
            if(obj.notFound===true){
                User.update({"useremail":userEmail}, 
                {
                    $set:{
                        "username":obj.username,
                        "updated":true
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
            }
            else{
                response.json({message:"taken"});
            }
        });      
    },

    ////updating info
    updateProfileData:function (request,response,session){
        var profileObject=request.body;
        var userName= session.username;
    
        User.update({
            "username":userName
        }, 
        {
            $set:{
                "userinfo":profileObject,
                "updated":true,
            }
        }
        ,function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                response.json({message:"success"});
            }
        });
    }, 
    /////////////Mobile Number Verifiction 
    ////Send Sms
    sendVerificationCode:function(request,response,session){
        var MobileObject=request.body;
        var UserEmail= session.useremail;
        var number=MobileObject.CountryCode+MobileObject.MobileNumber;
        var code=utils.randomStringGenerate(6);
        var body='Your verification code is '+code;
       
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
    verifyCode:function(request,response,session){
        var that=this;
        var UserEmail= session.useremail;
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
                    that.checkMobileExists(result,response);
                }
            } 
        });
    },

     ////Check if mobile no. already exists
    checkMobileExists:function(result,response){
        var that=this;
        var oldResult=result;

        User.find({
            "mobile":result[0].temporarymobile
        },function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{
                if(result[0]!=undefined){
                    response.json({message:"exists"});
                }
                else{
                    that.setMobile(oldResult,response);
                }
            }
        });        
    },

    ////Updating Mobileno.
    setMobile:function(result,response){
        var TemporaryMobile=result[0].temporarymobile;
        var UserEmail=result[0].useremail;

        User.update({
            "useremail":UserEmail
        },
        {
            $set:{
                "mobile":TemporaryMobile,
                "temporarymobile":undefined,
                "mobileverificationcode":undefined,
                "updated":true
            }
        },function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                response.json({message:"pass"});
            }
        });
    },

    //////Checking old password
    checkPassword:function (request,response,session){
        var that=this;
        var passwordObject=request.body;
        var userName=session.username;
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
                    var salt=result[0].salt;
                    var encryptedData=encrypt.sha512(passwordObject.oldpassword,salt);

                    passwordObject.oldpassword=encryptedData.hash;
                    if(result[0].password1===passwordObject.oldpassword){
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