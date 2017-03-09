'use strict';

const User = require("../schemadefine");
const utils =require("../utils");

const dbOperations={

    //Check login id and password > Fill Session
    doLogin:function (request,response){
        var loginObject=request.body;

        User.find({
            "$or": [{
                    "useremail":loginObject.loginid
                }, 
                {
                    "username": loginObject.loginid
                }]
        },
        function(error,result){
            if(error){
                console.log("Error Occured",error);
            }
            else{ 
                if(result.length<1){
                    response.json({message:"fail"});
                }
                else{
                    const encrypt=require('../encrypt');
                    var salt=result["0"].salt;
                    var encryptedData=encrypt.sha512(loginObject.loginpassword,salt);

                    loginObject.loginpassword=encryptedData.hash;
                    if(result["0"].password1===loginObject.loginpassword){
                        result["0"].rememberMe=loginObject.rememberMe;
                        utils.FillSession(request,result);
                        response.json({message:"success"});   
                    }
                    else{
                        response.json({message:"fail"});
                    }  
                }  
            }
        });
    },

};

module.exports =dbOperations;