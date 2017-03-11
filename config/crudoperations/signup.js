'use strict';

const User = require("../schemadefine");

const commonOperations=require("./commonoperations");

const dbOperations={

    ////Check Email > Username if already exists 
    checkUser:function (request,response){
        var that=this;
        var userObject =request.body;

        User.find({
            "useremail":userObject.useremail
        },
        function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                if(result[0]!=undefined){
                    response.json({message:"emailTaken"});
                }
                else
                {
                    var obj={
                        "username":userObject.username,
                        "notFound":undefined
                    };
                    commonOperations.checkUsername(obj,function(){
                        if(obj.notFound==true){
                            that.addUser(request,response);
                        }
                        else{
                            response.json({message:"usernameTaken"});
                        }
                    });
                }
            }
        });
    },
    /////////////Adding new user
    addUser:function(request,response){
        const utils =require("../utils");
        var data =request.body;

        const encrypt=require('../encrypt');
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
                utils.fillSession(request,result);
                commonOperations.sendLink(result[0].useremail,"emailactivate","emailactivationtoken");
                response.json({message:"pass"});
            }
        });
    },
};

module.exports =dbOperations;