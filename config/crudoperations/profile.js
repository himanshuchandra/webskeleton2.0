'use strict';

const User = require("../userschema");
const utils =require("../utils");
const commonOperations=require("./commonoperations");
const logger = require("../logger");

const dbOperations={

    //Updating username
    changeUsername:function(request,response,session){
        logger.debug('crud profile changeUsername');
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
                    }
                },
                function(error,result){
                    if(error){
                        logger.error(error);
                    }
                    else{ 
                        logger.debug('crud result'+ result); 
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
        logger.debug('crud profile updateProfileData');
        var profileObject=request.body;
        var userInfo={};
        userInfo.fullname=profileObject.fullname;
        userInfo.area=profileObject.area;
        userInfo.city=profileObject.city;
        userInfo.state=profileObject.state;
        userInfo.pincode=profileObject.pincode;
        userInfo.country=profileObject.country;

        var userEmail= session.useremail;
    
        User.update({
            "useremail":userEmail
        }, 
        {
            $set:{
                "userinfo":userInfo,
            }
        }
        ,function(error,result){
            if(error){
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                response.json({message:"success"});
            }
        });
    }, 
    /////////////Mobile Number Verifiction 
    ////Send Sms
    sendVerificationCode:function(request,response,session){
        logger.debug('crud profile sendVerificationCode');
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
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                utils.sendSms(number,body);
                //need to be a callback function
                response.json({message:"success"});
            }
        });
    },

    ////verify code
    verifyCode:function(request,response,session){
        logger.debug('crud profile verifyCode');
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
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
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
        logger.debug('crud profile checkMobileExists');
        var that=this;
        var oldResult=result;

        User.find({
            "mobile":result[0].temporarymobile
        },function(error,result){
            if(error){
                logger.error(error);
            }
            else{
                logger.debug('crud result'+ result); 
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
        logger.debug('crud profile setMobile');
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
            }
        },function(error,result){
            if(error){
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                response.json({message:"pass"});
            }
        });
    },

    //////Checking old password
    checkPassword:function (request,response,session){
        logger.debug('crud profile checkPassword');
        var that=this;
        var passwordObject=request.body;
        var userEmail=session.useremail;
        User.find({
            "useremail":userEmail
        }
        ,function(error,result){
            if(error){
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                if(result.length<1){
                    response.json({message:"notFound"});
                }
                else if(result[0].salt===undefined){
                    response.json({message:"fail"});
                }
                else{
                    const encrypt=require('../encrypt');
                    var salt=result[0].salt;
                    var encryptedData=encrypt.sha512(passwordObject.oldpassword,salt);

                    passwordObject.oldpassword=encryptedData.hash;
                    if(result[0].password1===passwordObject.oldpassword){
                        that.setNewPassword(request,response,session);
                    }
                    else{
                        response.json({message:"fail"});
                    }  
                }  
            }
        });
    },
    //////////////Setting new password
    setNewPassword:function (request,response,session){
        logger.debug('crud profile setNewPassword');
        var passwordObject=request.body;

        const encrypt=require('../encrypt');
        var salt=encrypt.genRandomString(16);
        var encryptedData=encrypt.sha512(passwordObject.password1,salt);

        passwordObject.password1=encryptedData.hash;
        passwordObject.salt=encryptedData.salt;

        var userEmail=session.useremail;
    
        User.update({
            "useremail":userEmail
        }, 
        {
            $set:{
                "password1":passwordObject.password1,
                "salt":passwordObject.salt
            }
        },
        function(error,result){
            if(error){
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                response.json({message:"success"});
            }
        });
    },

};

module.exports =dbOperations;