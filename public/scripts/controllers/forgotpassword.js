'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ForgotpasswordCtrl', function ($scope,forgotpassword,$window,$location,requrl,md5) {


    ////////////////////////////////////////////////
      $scope.CheckToken=function(){
         
         $scope.Result="Checking";

          var PasswordObject={
            "UserEmail":UserEmail,
            "Token":Token,  
          }
         
          var promise = forgotpassword.PasswordReset(PasswordObject);
          promise.then(function(data){
          //console.log(data.data);
            if(data.data.msg==="fail"){
              $scope.Result="Link expired.. Send a new one!";
            }
            else{
              UserEmail=PasswordObject.UserEmail;
              $scope.NewPasswordForm=false;
              $scope.Result=undefined;
              //show new password form
            }
          }
          ,function(error){
            $scope.Result = "Error occured,Try again later";
          });
      };

  ///////////////////////////////////////////

    $scope.NewPasswordForm=true; 
    var UserEmail=$location.search().e;
    var Token=$location.search().t;


    if(UserEmail!=undefined)
    {
        //console.log(true,$location.search().e)
        $scope.SendForm=true;
         //hidden
        $scope.CheckToken();

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

////////////////////////////////
          var arePasswordsSame=false;
    
          $scope.checkPassword=function(){
          if($scope.ResetPassword2!=undefined)
          {   
              if($scope.ResetPassword===$scope.ResetPassword2)
              {   
                $scope.PasswordMessage="Passwords match";
                arePasswordsSame=true;
                
              }
              else if($scope.ResetPassword==undefined){
                 $scope.PasswordMessage=undefined;
                 arePasswordsSame=false;
              }
              else{
                $scope.PasswordMessage="Passwords dont match";
                arePasswordsSame=false;
                
              }
          }
        };

          $scope.submitPasswordForm=function(passForm){
             if(passForm.$valid && arePasswordsSame==true){
                    $scope.SaveNewPassword();
                    $scope.PasswordResult="Updating Password";
           
            }
            else{
              $scope.PasswordResult="Enter correct passwords";
            }
          };

      $scope.SaveNewPassword=function(){
         
         $scope.Result="Checking";
         var HashPassword=md5.createHash($scope.ResetPassword);

          var NewPasswordObject={
            "UserEmail":UserEmail,
            "NewPassword":HashPassword,
          }
         
          var promise = forgotpassword.SaveNewPassword(NewPasswordObject);
          promise.then(function(data){
            console.log("xxx",data);
            $scope.NewPasswordForm=true; 
            $scope.Result = "Password Changed";
          }
          ,function(error){
            $scope.Result = "Error occured,Try again later";
          });
      };

  });
