'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.superadmin
 * @description
 * # superadmin
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('superadmin', function ($http,$q,requrl) {

    var object = {

        loadRights:function(){
          var defer = $q.defer();
          $http.get(requrl+'/roles/loadRights')
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
