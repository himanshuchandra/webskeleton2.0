'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.login
 * @description
 * # login
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('login', function ($http,$q,requrl) {
    var object = {
        loginUser:function(loginObject){
            
          var defer = $q.defer(); $http.post(requrl+'/allroutes/login',loginObject).then(function(data){
               defer.resolve(data);
           },function(error){
               console.log(error);
               defer.reject(error);
           }) 
            return defer.promise;
        }
        
        };
    return object;
  });
