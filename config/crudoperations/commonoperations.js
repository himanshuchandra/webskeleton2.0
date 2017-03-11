'use strict';

const User = require("../schemadefine");
const utils =require("../utils");

const dbOperations= {

    ////////Checking if username exists  ///////////////////// 
    checkUsername:function (object,callback){

        User.find({"username":object.username},function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                if(result[0]!=undefined){
                    object.notFound=false;
                }
                else
                {
                    object.notFound=true;
                }
            }
            callback();
        });
    },   

    ///////////Email activation /////////////////////////
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
                    that.activateEmail(activationObject.userEmail,response);
                }
            } 
        });
    },

    //////////Activating email
    activateEmail:function (userEmail,response){
        User.update({
            "useremail":userEmail
        },
        {
            $set:{
                "emailverified":true,
                "emailactivationtoken":undefined
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


    //////////////////Social Signin//////////////////////////
    ///////////Check if user exists
    socialSignin:function(request,response){
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
                if(result[0]===undefined){
                    that.socialRegister(request,response);
                }
                else{
                    utils.fillSession(request,result);
                    response.json({message:"loggedIn"});
                }
            }
            else{
                response.json({message:"fail"});
            }
        })
    },   
    
    ////////Register new User
    socialRegister:function(request,response){
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

        User.create(UserData,function(error,result){
            if(error){
                response.json({message:"Can't Add Error Occured, Try later"});
            }
            else{
                result=[result];
                utils.fillSession(request,result);
                response.json({message:"registered"});
            }
        });
    },

    ////////////Send Activation/forgotpassword link//////////////
    sendLink:function(UserEmail,Page,TokenType){
        const config =require("../config");
        var RandomToken=utils.randomStringGenerate(32);
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
                utils.sendMail(UserEmail,"sub",Url);
            }
        });
        
    }
};

module.exports =dbOperations; 
