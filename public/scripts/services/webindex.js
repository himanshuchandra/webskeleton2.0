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

        needReload:true,
        loaded:false,
        loggedIn:false,
        userData:{},

        checkStatus:function(){
          var defer = $q.defer();
          $http.post(requrl+'/webindex')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },

        sendActivationLink:function(){
          var defer = $q.defer();
          $http.post(requrl+'/sendActivationLink')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        },

        logout:function(){
          var defer = $q.defer();
          $http.post(requrl+'/logout')
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           })
            return defer.promise;
        }

    };
    return object;

  });
