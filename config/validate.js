'use strict';
const logger = require("./logger");

const validate = {

    username: function (string) {
        logger.debug('validate username');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9._]+$/;
        if (string.length < 5 || string.length > 20 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    password: function (string) {
        logger.debug('validate password');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[a-z0-9]+$/;
        if (string.length != 32 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    email: function (string) {
        logger.debug('validate email');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var comValid=true;
        var atpos = string.indexOf("@");
        var dotpos = string.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= string.length) {
            comValid=false;
        }
        var letters = /^[A-Z0-9a-z!@#$%&*+-/=?^_`'{|}~]+$/;
        if (string.length < 5 || string.length > 50 || string.match(letters) === null || string.match("@") === null || comValid===false) {
            return false;
        }
        else {
            return true;
        }
    },
    mobile: function (string) {
        logger.debug('validate mobile');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[0-9]+$/;
        if (string.length != 10 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    number: function (string) {
        logger.debug('validate number');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[0-9]+$/;
        if (string.length < 3 || string.length > 15 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    string: function (string) {
        logger.debug('validate string');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9-/_',. ]+$/;
        if (string.length < 2 || string.length > 60 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    name: function (string) {
        logger.debug('validate name');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z ]+$/;
        if (string.length < 3 || string.length > 30 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    },
    code: function (string) {
        logger.debug('validate code');
        if (string === undefined) {
            return false;
        }
        var string = string.trim();
        var letters = /^[A-Za-z0-9+]+$/;
        if (string.length < 2 || string.length > 16 || string.match(letters) === null) {
            return false;
        }
        else {
            return true;
        }
    }
};

module.exports = validate;
