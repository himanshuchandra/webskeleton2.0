'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ForgotpasswordCtrl', function ($scope,forgotpassword,$window,$location,requrl) {
     $scope.cc=function() {
      console.log("happpppyy");
    }
    $scope.NewPasswordForm=true; 
    if($location.search().e!=undefined)
    {
        //console.log(true,$location.search().e)
        $scope.SendForm=true;
         //hidden
        // $scope.CheckToken();
      $scope.cc();
    }
    else{
        $scope.SendForm=false;
    }

    // $scope.CheckToken();
    
   
//////////////////////////////////////////////////
     $scope.submitForm=function(forgotForm) {
        if(forgotForm.$valid){
          $scope.SendLink();
        }
    };

     $scope.SendLink=function() {
      
        var ForgotObject={
            "Email":$scope.ForgotEmail,
        };
        
        
        var promise=forgotpassword.SendLink(ForgotObject);
        promise.then(function(data){

          $scope.result = data.data.msg;
      
        },function (error) {
            $scope.result = "error occurred";
        });

      }; 
////////////////////////////////////////////////
      $scope.CheckToken=function(){
         
         $scope.Result="Checking";

          var PasswordObject={
            "UserEmail":$location.search().e,
            "Token":$location.search().t,  
          }
         
          var promise = forgotpassword.PasswordReset(PasswordObject);
          promise.then(function(data){
          //console.log(data.data);
            if(data.data.msg==="fail"){
              $scope.Result="Link expired.. Send a new one!";
            }
            else{
              $scope.NewPasswordForm=false;
              //show new password form
            }
          }
          ,function(error){
            $scope.Result = "Error occured,Try again later";
          });
      };
////////////////////////////////
      $scope.SaveNewPassword=function(){
         
         $scope.Result="Checking";

          var PasswordObject={
            "UserEmail":$location.search().e,
            "Token":$location.search().t,  
          }
         
          var promise = forgotpassword.PasswordReset(PasswordObject);
          promise.then(function(data){
          //console.log(data.data);
            if(data.data.msg==="fail"){
              $scope.Result="Link expired.. Send a new one!";
            }
            else{
              $scope.NewPasswordForm=false;
              //show new password form
            }
          }
          ,function(error){
            $scope.Result = "Error occured,Try again later";
          });
      };

  });
