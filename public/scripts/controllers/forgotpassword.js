'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ForgotpasswordCtrl', function ($scope,forgotpassword,$window,requrl) {

     $scope.submitForm=function(ForgetForm) {
        if(ForgetForm.$valid){
          $scope.SendLink();
        }
    };

     $scope.SendLink=function() {
      
        var ForgotObject={
          "Email":$scope.ForgotEmail
        };
        var promise=forgotpassword.SendLink(ForgotObject);
        promise.then(function(data){


      
        },function (error) {
            $scope.result = "error occurred";
        });

      }; 

  });
