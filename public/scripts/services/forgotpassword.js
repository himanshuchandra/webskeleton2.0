'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.forgotpassword
 * @description
 * # forgotpassword
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('forgotpassword', function ($http,$q,requrl) {
      
      var object= {

        sendLink:function(ForgotObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/forgotpassword/sendLink',ForgotObject)
          .then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },

        passwordReset:function(PasswordObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/forgotpassword/passwordReset',PasswordObject)
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
