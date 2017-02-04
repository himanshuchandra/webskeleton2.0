'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:EmailactivateCtrl
 * @description
 * # EmailactivateCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('EmailactivateCtrl', function ($scope,$location,emailactivate,$window,requrl) {
    
    $scope.Result="Activating your Email";

    var ActivationObject={
        "UserEmail":$location.search().e,
        "Token":$location.search().t,  
    }
         
    var promise = emailactivate.ActivateEmail(ActivationObject);
    promise.then(function(data){
      //console.log(data.data);
      $scope.Result=data.data.msg;
      $window.location.reload();
      $window.location.assign(requrl);
      }
      ,function(error){
        $scope.Result = "Error occured,Try again later";
      });

  });
