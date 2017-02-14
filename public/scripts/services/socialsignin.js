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
        SocialSignin:function(SocialObject){
            
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/SocialSignin',SocialObject).then(function(data){
               defer.resolve(data);
           },function(error){
               
               defer.reject(error);
           }) 
            return defer.promise;
        },

        
      };
    return object;
  });
