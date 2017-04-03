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
        /* Optional call if loading data from session
        getData:function(){
          var defer = $q.defer(); 
          $http.post(requrl+'/profile/getData')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },*/

        checkUsername:function(usernameObj){
           var defer = $q.defer();
           $http.post(requrl+'/commonroutes/checkUsername',usernameObj)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },
        
       changeUsername:function(usernameObject){
            var defer=$q.defer();
            $http.post(requrl+"/profile/changeUsername",usernameObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateProfileData:function(profileObject){
            var defer=$q.defer();
            $http.post(requrl+"/profile/updateProfileData",profileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateMobile:function(mobileObject){
            var defer=$q.defer();
            $http.post(requrl+"/profile/updateMobile",mobileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        verifyCode:function(codeObject){
            var defer=$q.defer();
            $http.post(requrl+"/profile/verifyCode",codeObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        setNewPassword:function(passwordObject){
            var defer=$q.defer();
            $http.post(requrl+"/profile/setNewPassword",passwordObject)
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
