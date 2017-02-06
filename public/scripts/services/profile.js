'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.profile
 * @description
 * # profile
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('profile', function ($http,$q,requrl) {

      var object = {
        getData:function(){
            
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/getData')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               console.log(error);
               defer.reject(error);
           }) 
            return defer.promise;
        },

        setProfileData:function(profileObject){
            var defer=$q.defer();
            $http.post(requrl+"/allroutes/UpdateProfileData",profileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                console.log(error);
                defer.reject(error);
            })
            return defer.promise;

        },

        setNewPassword:function(passwordObject){
            var defer=$q.defer();
            $http.post(requrl+"/allroutes/SetNewPassword",passwordObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                console.log(error);
                defer.reject(error);
            })
            return defer.promise;

        },
        
        UpdateMobile:function(MobileObject){
            var defer=$q.defer();
            $http.post(requrl+"/allroutes/UpdateMobile",MobileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                console.log(error);
                defer.reject(error);
            })
            return defer.promise;

        },
        VerifyCode:function(CodeObject){
            var defer=$q.defer();
            $http.post(requrl+"/allroutes/VerifyCode",CodeObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                console.log(error);
                defer.reject(error);
            })
            return defer.promise;

        },

        };
    return object;

  });
