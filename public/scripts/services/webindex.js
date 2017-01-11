'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.webindex
 * @description
 * # webindex
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('webindex', function ($http,$q,requrl) {
      var object = {
        checkStatus:function(){
            
          var defer = $q.defer(); 
          $http.post(requrl+'/allroutes/webindex').then(function(data){
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
