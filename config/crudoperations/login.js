'use strict';

const User = require("../schemadefine");


const dbOperations={

    //Check login id and password > Fill Session
    doLogin:function (request,response){
        const utils =require("../utils");
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
                        var sessionData=result["0"];
                        if(loginObject.appCall===true){
                            var randomString=utils.randomStringGenerate(32);
                            utils.fillAppSession(sessionData,randomString);
                            response.json({message:"success",sessionid:randomString});
                        }
                        else{
                            utils.fillWebSession(request,sessionData);
                            response.json({message:"success"});
                        }  
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