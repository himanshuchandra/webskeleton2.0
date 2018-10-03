'use strict';

const config = require('./config');
const logger = require("../config/logger");
const allUrls = require('./registeredUrls');
const confUrls = require('./confUrls');

const authUrls = allUrls.authUrls;

var init = {
    superAdmin:function(){
        logger.debug('init>createSuperAdmin');
        var superAdminRights = [];
        
        Object.keys(confUrls).forEach(function(key){
            for(var i = 0;i<confUrls[key].length;i++){
                var right={
                    name:confUrls[key][i],
                    path: key,
                    url: key + confUrls[key][i]
                }
                superAdminRights.push(right);
            }
        });
        
        Object.keys(authUrls).forEach(function(key){
            for(var i = 0;i<authUrls[key].length;i++){
                var right={
                    name:authUrls[key][i],
                    path: key,
                    url: key + authUrls[key][i]
                }
                superAdminRights.push(right);
            }
        });
        

        const dbOperations= require('./crudoperations/rolecrud');
        dbOperations.createSuperAdmin((error,result)=>{
            if(error){
                process.exit();
            }
        });

        dbOperations.getRole('superadmin',(error,result)=>{
            if(error){
                process.exit();
            }
            else{
                if(result[0]){
                    dbOperations.fillRights(result[0].roleid, superAdminRights, (error,result)=>{
                        if(error){
                            process.exit();
                        }
                    });
                }
                else{
                    dbOperations.createRole('superadmin',(error,result)=>{
                        if(error){
                            process.exit();
                        }
                        else{
                            if(result){
                                dbOperations.fillRights(result.roleid, superAdminRights, (error,result)=>{
                                    if(error){
                                        process.exit();
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

}

module.exports = init;