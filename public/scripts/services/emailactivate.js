'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.emailactivate
 * @description
 * # emailactivate
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('emailactivate', function ($http,$q,requrl) {

    var object = {

        activateEmail:function(activationObject){
            var defer = $q.defer(); 
            $http.post(requrl+'/commonroutes/activateEmail',activationObject)
            .then(function(data){
                defer.resolve(data);
            },function(error){
                defer.reject(error);
            }) 
            return defer.promise;
        },

    };
    return object;

  });
