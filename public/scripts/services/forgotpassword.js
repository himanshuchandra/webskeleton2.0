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
        SendLink:function(ForgotObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/SendLink',ForgotObject).then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },
        PasswordReset:function(PasswordObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/PasswordReset',PasswordObject).then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },
        SaveNewPassword:function(NewPasswordObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/SaveNewPassword',NewPasswordObject).then(function(data){
            defer.resolve(data); 
          },function(error){
            defer.reject(error);
          })
          return defer.promise;
        },
      };
    return object;
  });
