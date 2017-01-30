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
          ActivateEmail:function(ActivationObject){
            
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/ActivateEmail',ActivationObject).then(function(data){
               defer.resolve(data);
           },function(error){
               
               defer.reject(error);
           }) 
            return defer.promise;
        },

        
        };
    return object;
  });
