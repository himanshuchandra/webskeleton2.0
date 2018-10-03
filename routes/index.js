'use strict';

///Routing for index factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/index");
const logger = require("../config/logger");

/* GET home page. */
router.get('/', function(req, res, next) {
    var path = require("path");
    var welcomePage = require("../config/pages");
    var newPath = path.normalize(__dirname+"/..");
    var homePagePath = path.join(newPath,welcomePage);
    res.sendFile(path.resolve(homePagePath));

});

///Check login Status
router.post('/webindex', function(request,response) {
    logger.debug('routes index webindex');
 
    dbOperations.checkSession(request,response,request.userData);
           
});

///Send email activation link
router.post('/sendActivationLink',function(request,response){
    logger.debug('routes index sendActivationLink');

    dbOperations.sendActivationLink(request.userData.useremail,response);
});

///Logging out
router.post('/logout',function(request,response){
    logger.debug('routes index logout');
    dbOperations.destroySession(request,response);
});

module.exports = router;
