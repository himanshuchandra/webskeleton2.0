'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.login
 * @description
 * # login
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('login', function ($http,$q) {
    var object = {
        loginUser:function(loginObject){
            
          var defer = $q.defer(); $http.post('http://localhost:1234/allroutes/login',loginObject).then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        }
        
        };
    return object;
  });
