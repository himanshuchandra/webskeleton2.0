'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('LoginCtrl', function ($scope,login,$window,requrl,md5) {
 
     $scope.submitForm=function(loginForm){
           // console.log(regForm.$valid);
                if(loginForm.$valid){
                    $scope.doLogin();
                }
                
            }
    
    
    $scope.doLogin=function(){
        
        var hashLoginPassword=md5.createHash($scope.loginpassword);

        var loginObject = {
            "loginid":$scope.loginid,
            "loginpassword":hashLoginPassword,
            "rememberMe":$scope.RememberMe
        };
        var promise = login.loginUser(loginObject);
        promise.then(function(data){
            console.log("SUCCESS ",data);
           var res = data.data.msg;
            //console.log(res);
            //var token;
           
            if(res==="success"){
    
                    $scope.result="Logged in successfully";
                    $window.location.reload();
                    $window.location.assign(requrl+"/#/profile");
                    
            //         var promise2 = login.redirect(requrl+"/#/profile");
            //          promise.then(function(data){  
        
            //               });
            //         //$location.path(requrl+"/profile");
            }
             else{
                     $scope.result="Wrong email or password";
                }
           
             
            
        
        },function(error){
            $scope.result = "error occurred";
        });
    }
    
  });
