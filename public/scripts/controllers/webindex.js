'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:WebindexCtrl
 * @description
 * # WebindexCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('WebindexCtrl', function ($scope,webindex,requrl,$window) {

     $scope.loginStatus="Login/SignUp";
     $scope.ActivationStatus=true;
     $scope.LoginButton=false;
     $scope.SignupButton=false;
     $scope.ProfileButton=true;
     $scope.LogoutButton=true;

     var Email;
     $scope.ActivationMessage=undefined;
     
     var promise = webindex.checkStatus();
        promise.then(function(data){
              $scope.loginStatus=data.data.Message;
              if(data.data.Email!=undefined){
                  $scope.LoginButton=true;
                  $scope.SignupButton=true;
                  $scope.ProfileButton=false;
                  $scope.LogoutButton=false;
                  Email=data.data.Email;
              }
              if(data.data.ActivationStatus==false){
                  $scope.Status="Your Email address "+data.data.Email+" is not Verified";
                  $scope.ActivationStatus=false;
             }
      
      });

      ////////////////////////////
      $scope.SendActivationLink=function(){
          var EmailObject={
              "Email":Email
          }
          var promise = webindex.SendActivationLink(EmailObject);
            promise.then(function(data){
                $scope.ActivationMessage="Link Sent";
            },function(error){
                $scope.ActivationMessage="Error,Try again Later";
        });
      };

      ///////////////////////////////
      $scope.Logout=function(){
          var promise = webindex.Logout();
            promise.then(function(data){
                $window.location.reload();
                $window.location.assign(requrl);
            },function(error){
                $scope.LogoutMessage="Error,Try again Later";
        });
      };


  });
