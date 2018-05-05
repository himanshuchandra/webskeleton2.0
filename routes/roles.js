'use strict';

//Routing for superadmin factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/rolecrud");
const validate = require("../config/validate");
const logger = require("../config/logger");
const allUrls = require("../config/registeredUrls");
const authUrls = allUrls.authUrls;

router.get('/getRights', function (request, response) {
    logger.debug('routes sadmin getRights');

    response.send(authUrls);

});


router.get('/loadRoles', function (request, response) {
    logger.debug('routes sadmin loadRoles');

    dbOperations.loadRoles((error, result) => {
        if (error) {
            response.json({ "message": "fail" });
        }
        else {
            response.send(result);
        }
    });

});

router.post('/createRole', function (request, response) {
    logger.debug('routes sadmin createRole');

    var isValidRole = validate.name(request.body.role);

    if (isValidRole) {

        dbOperations.getRole(request.body.role, (error, result) => {
            if (error) {
                response.json({ "message": "fail" });
            }
            else {
                if (result[0]) {
                    response.json({ "message": "exists" });
                }
                else {
                    dbOperations.createRole(request.body.role, (error, result) => {
                        if (error) {
                            response.json({ "message": "fail" });
                        }
                        else {
                            response.json({ "message": "success" });
                        }
                    });
                }
            }
        });
    }
    else {
        response.json({ "message": "unknown" });
    }
});


router.post('/updateRights', function (request, response) {
    logger.debug('routes sadmin updateRole');

    var isValidRoleid = validate.id(request.body.roleid);

    if (isValidRoleid) {
        var input = request.body.rights;
        var newRights = [];
        Object.keys(authUrls).forEach(function (key) {
            for (var i = 0; i < authUrls[key].length; i++) {
                if (input.indexOf(authUrls[key][i]) > -1){
                    var right = {
                        name: authUrls[key][i],
                        path: key,
                        url: key + authUrls[key][i]
                    }
                    newRights.push(right);
                }
            }
        });

        dbOperations.fillRights(request.body.roleid, newRights, (error, result) => {
            if (error) {
                response.json({ "message": "fail" });
            }
            else {
                response.send({ "message": "success" });
            }
        });
    }
    else {
        response.json({ "message": "unknown" });
    }

});

router.post('/deleteRole', function (request, response) {
    logger.debug('routes sadmin deleteRole');

    var isValidRoleid = validate.id(request.body.roleid);

    if (isValidRoleid) {
        dbOperations.deleteRole(request.body.roleid, (error, result) => {
            if (error) {
                response.json({ "message": "fail" });
            }
            else {
                response.send({ "message": "success" });
            }
        });
    }
    else{
            response.json({ "message": "unknown" });
    }

});

module.exports = router;