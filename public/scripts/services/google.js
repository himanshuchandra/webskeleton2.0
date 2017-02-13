'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.google
 * @description
 * # google
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('google', function ($http,$q,requrl) {
    var object = {
        GoogleSignin:function(GoogleObject){
            
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/GoogleSignin',GoogleObject).then(function(data){
               defer.resolve(data);
           },function(error){
               
               defer.reject(error);
           }) 
            return defer.promise;
        },

        
        };
    return object;
  });