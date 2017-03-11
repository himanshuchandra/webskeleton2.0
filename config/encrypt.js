'use strict';

const crypto = require('crypto');

const encrypt={

    /*
    * generates random string of characters i.e salt
    * @function
    * @param {number} length - Length of the random string.
    */
    genRandomString : function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')     /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
    },   

    /*
     * hash password with sha512.
     * @function
     * @param {string} password - List of required fields.
     * @param {string} salt - Data to be validated.
     */
    sha512 : function(string, salt){
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(string);
        var value = hash.digest('hex');
        return {
            salt:salt,
            hash:value
        }
    },
    
};

module.exports=encrypt;





