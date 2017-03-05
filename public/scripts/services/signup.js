'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.signup
 * @description
 * # signup
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('signup', function ($http,$q,requrl) {
   //var data= {key,value};
    var userdata=[];

    var object = {
        
        checkUsername:function(usernameObj){
           var defer = $q.defer();
           $http.post(requrl+'/allroutes/checkUsername',usernameObj)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;

        },

        registerUser:function(userObject){
          var defer = $q.defer();
           $http.post(requrl+'/allroutes/register',userObject)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        }
      
        };
        
     

    return object;
  });
