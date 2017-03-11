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
    
    $scope.result="Activating your Email";

    $scope.checkToken=function(){
      var promise = emailactivate.activateEmail(activationObject);
      promise.then(function(data){
        if(data.data.message==="success"){
          $scope.result=data.data.message;
        }
        else{
          $scope.result="Not Found";
        }
        $window.location.reload();
        $window.location.assign(requrl);
      }
      ,function(error){
        $scope.result = "Error occured,Try again later";
      });
    };

    var activationObject={
        "userEmail":$location.search().e,
        "token":$location.search().t,  
    }

    if(activationObject.userEmail!=undefined && activationObject.token!=undefined){
      $scope.checkToken();
    }
    else{
      $window.location.assign(requrl);
    }

  });
