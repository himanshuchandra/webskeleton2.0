'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:WebindexCtrl
 * @description
 * # WebindexCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('WebindexCtrl', function ($scope,webindex) {

     $scope.loginStatus="Login/SignUp";

     var promise = webindex.checkStatus();
        promise.then(function(data){
              $scope.loginStatus=data.data;

        });
  });
