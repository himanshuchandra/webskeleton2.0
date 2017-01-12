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
          $http.post(requrl+'/allroutes/getData').then(function(data){
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
