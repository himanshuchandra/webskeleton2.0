'use strict';

const User = require("../userschema");

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

        var data={};
        data.useremail=request.body.useremail;
        data.username=request.body.username;
        data.password1=request.body.password1;
        data.role="customer";
    
        const encrypt=require('../encrypt');
        var salt=encrypt.genRandomString(16);
        var encryptedData=encrypt.sha512(data.password1,salt);

        data.password1=encryptedData.hash;
        data.salt=encryptedData.salt;

        data.userid = utils.randomStringGenerate(32);

        data.registrationdate=new Date();
        data.emailverified=false;
        User.create(data,function(error,result){
            
            if(error){
                console.log("Error Occured",error);
            }
            else{
                commonOperations.sendLink(result.useremail,"emailactivate","emailactivationtoken");
                var responseObject={
                    message:"pass",
                };
                utils.fillSession(request,response,result,responseObject);
            }
        });
    },
};

module.exports =dbOperations;