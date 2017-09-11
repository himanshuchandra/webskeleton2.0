'use strict';

const User = require("../userschema");
const logger = require("../logger");


const dbOperations={

    //Check login id and password > Fill Session
    doLogin:function (request,response){
        logger.debug('crud login doLogin');
        const utils =require("../utils");
        var loginObject=request.body;

        User.find({
            "$or": [{
                    "useremail":loginObject.loginid
                }, 
                {
                    "username": loginObject.loginid
                },
                {
                    "mobile": { "$regex": loginObject.loginid, "$options": "i" }
                }]
        },
        function(error,result){
            if(error){
                logger.error(error);
            }
            else{ 
                logger.debug('crud result'+ result); 
                if(result.length<1){
                    response.json({message:"fail"});
                }
                else{
                    var i=0;
                    var numberOfUsersFound=0;
                    const encrypt=require('../encrypt');
                    while(i<result.length){
                        if(result[i].salt===undefined){
                            i++;
                        }
                        else{
                            var salt=result[i].salt;
                            var encryptedData=encrypt.sha512(loginObject.loginpassword,salt);

                            var encryptedPassword=encryptedData.hash;
                            if(result[i].password1===encryptedPassword){
                                result[i].rememberMe=loginObject.rememberMe;
                                numberOfUsersFound++;
                                var sessionData=result[i];
                            }
                            i++;    
                       }
                    }
                    if(numberOfUsersFound===1){
                        var responseObject={
                            message:"success",
                        };
                        utils.fillSession(request,response,sessionData,responseObject);
                    }
                    else if(numberOfUsersFound>1){
                        response.json({message:"conflict"});
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