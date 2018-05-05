'use strict';

const Role = require("../roleschema");
const logger = require("../logger");
const config = require("../config");
const urls = require('../registeredUrls');
const confUrls = require('../confUrls');

const dbOperations = {

    getRole: function (role, callback) {
        logger.debug('crud role getRole');
        Role.find({
            "$or": [
                { role: role },
                { id: role }
            ]
        },
            function (error, result) {
                if (error) {
                    logger.error(error);
                    callback(error, null);
                }
                else {
                    callback(null, result);
                }
            });
    },

    createRole: function (role, callback) {
        logger.debug('crud role createsuperadminrole');
        const utils = require('../utils');

        var data = {};

        data.roleid = utils.randomStringGenerate(8);
        data.role = role;

        Role.create(data, function (error, result) {
            if (error) {
                logger.error(error);
                callback(error, null);
            }
            else {
                logger.debug('crud result' + result);
                callback(null, result);
            }
        });
    },

    createSuperAdmin: function (callback) {
        logger.debug('crud role createsuperadmin');
        const utils = require('../utils');
        const User = require('../userschema');
        User.find({
            role: "superadmin"
        }
            , function (error, result) {
                if (error) {
                    logger.error(error);
                    callback(error, null);
                }
                else {
                    logger.debug('crud result' + result);
                    if (result.length < 1) {
                        var data = {};
                        data.useremail = config.superadminEmail;
                        data.username = 'superadmin';
                        data.password1 = 'superadmin';
                        data.role = "superadmin";

                        data.userid = utils.randomStringGenerate(32);
                        data.registrationdate = new Date();
                        data.emailverified = false;

                        User.create(data, function (error, result) {
                            if (error) {
                                logger.error(error);
                                callback(error, null);
                            }
                            else {
                                logger.debug('crud result' + result);
                                const commonOps = require("./commonoperations");
                                commonOps.sendLink(result.useremail, "emailactivate", "emailactivationtoken");
                                callback(null, result);
                            }
                        });
                    }
                    else{
                        callback(null,result[0]);
                    }
                }

            });
    },

    fillRights: function (roleid, rights, callback) {
        logger.debug('crud role fillRights');

        Role.update({
            roleid:roleid
        },{
            "$set":{
                rights:rights
            }
        }, function (error, result) {
            if (error) {
                logger.debug(error);
                callback(error,null);
            }
            else {
                logger.debug('crud result' + result);
                callback(null,result);
            }
        })
    },
    
    deleteRole:function(roleid,callback){
        Role.find({
            roleid:roleid,
            role:{$ne:'superadmin'}
        }).remove(function (error, result) {
            if (error) {
                logger.debug(error);
                callback(error,null);
            }
            else {
                logger.debug('crud result' + result);
                callback(null,result);
            }
        })
    },

    loadRoles:function(callback){
        Role.find({},function (error, result) {
            if (error) {
                logger.debug(error);
                callback(error,null);
            }
            else {
                logger.debug('crud result' + result);
                callback(null,result);
            }
        })
    }   

};

module.exports = dbOperations;