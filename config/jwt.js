'use strict';


const Session = require("./sessionschema");
var jwt = require('jsonwebtoken');
const logger = require("./logger");
const config = require("./config");

var TokenOperations = {

    generateJwt : function(id,duration){
        logger.debug('jwt generateJwt');
        var token = jwt.sign({ userid: id }, config.jwtKey, {
            expiresIn: config.jwtDuration * duration
        });
        return token;
    },

    getUserid: function(token,callback){
        logger.debug('jwt getuserid');
        Session.findOne({sessionid:token},function(error,result){
            if(error){
                logger.error(error);
                callback(null);
            }
            else{
                if(result && result.userid){
                    callback(result);
                }
                else{
                    callback(null);
                }   
            }
        });
    },


    fillJwtSession: function(userData , callback){
        logger.debug('jwt fillJwtSession');
        var that = this;
        if (userData.userid) {
            var duration = 1;
            if(userData.rememberMe){
                duration = 30;
            }
            var token = that.generateJwt(userData.userid,duration);

            userData._id=undefined; //prevent duplicate record error
            userData=userData.toObject();
            userData.sessionid=token;

            Session.find({ userid : userData.userid }).remove(function (error, result) {
                if (error) {
                    logger.error(error);
                    callback(null);
                }
                else{
                    that.storeSession(userData, callback);
                }
            });
        }

    },

    storeSession: function(userData, callback){
        logger.debug('jwt storeToken');
        Session.create(userData,function(error,result){

            if(error){
                logger.error(error);
                callback(null)
            }
            else{
                callback(userData);
            }
        });
    },
};

module.exports = TokenOperations;    