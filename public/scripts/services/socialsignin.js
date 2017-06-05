'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.socialsignin
 * @description
 * # socialsignin
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('socialsignin', function ($q,$http,requrl) {

    var object = {

        socialSignin:function(SocialObject){   
          var defer = $q.defer(); 
          $http.post(requrl+'/commonroutes/socialSignin',SocialObject)
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },

        socialFacebook:function(){   
          var defer = $q.defer(); 
          $http.post(requrl+'/social/socialFacebook')
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
