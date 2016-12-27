'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ProfileCtrl', function ($scope,profile) {
   
          $scope.submitForm=function(passForm){
             if(passForm.$valid){
                    $scope.changePass();
           
            }
            else{
              $scope.result="Enter correct password";
            }
          }

          $scope.changePass=function () {  
              $scope.result="passchanged";
          }

  });
