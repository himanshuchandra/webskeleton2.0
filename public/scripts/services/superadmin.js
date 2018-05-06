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
          $http.get(requrl+'/roles/getRights')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },
        loadRoles:function(){
          var defer = $q.defer();
          $http.get(requrl+'/roles/loadRoles')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },
        createRole:function(role){
            var obj = {
                'role': role
            }
            var defer = $q.defer();
          $http.post(requrl+'/roles/createRole',obj)
          .then(function(data){
               defer.resolve(data.data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },
        updateRights:function(obj){
            var defer = $q.defer();
          $http.post(requrl+'/roles/updateRights',obj)
          .then(function(data){
               defer.resolve(data.data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },
        assignRole:function(obj){
            var defer = $q.defer();
          $http.post(requrl+'/roles/assignRole',obj)
          .then(function(data){
               defer.resolve(data.data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },
        deleteRole:function(obj){
            var defer = $q.defer();
          $http.post(requrl+'/roles/deleteRole',obj)
          .then(function(data){
               defer.resolve(data.data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        }

    };
    return object;

});
