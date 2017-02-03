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
     $scope.ActivationStatus=true;
     $scope.LoginButton=false;
     $scope.SignupButton=false;
     $scope.ProfileButton=true;

     var promise = webindex.checkStatus();
        promise.then(function(data){
              $scope.loginStatus=data.data.Message;
              if(data.data.Email!=undefined){
                  $scope.LoginButton=true;
                  $scope.SignupButton=true;
                  $scope.ProfileButton=false;
              }
              if(data.data.ActivationStatus==false){
                  $scope.Status="Your Email address "+data.data.Email+" is not Verified";
                  $scope.ActivationStatus=false;
             }
      
      });
  });
