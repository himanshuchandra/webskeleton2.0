'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('LoginCtrl', function ($scope,login,$window) {
 
     $scope.submitForm=function(loginForm){
           // console.log(regForm.$valid);
                if(loginForm.$valid){
                    $scope.doLogin();
                }
                
            }
    
    
    $scope.doLogin=function(){
        
        var loginObject = {
            "loginid":$scope.loginid,
            "loginpassword":$scope.loginpassword,
        };
        var promise = login.loginUser(loginObject);
        promise.then(function(data){
            console.log("SUCCESS ",data);
            var res = data.data.result;
            console.log(res);
            //var token;
            
            if(res.length<1){
            console.log("nodata");
                    $scope.result="Wrong email or password";
                    }
                else{
                    $scope.result="Logged in successfully";
                    $window.location.assign("http://localhost:1234/profile.html");
                }
            
            
            
        
        },function(error){
            $scope.result = "error occurred";
        });
    }
    
    
    $scope.forgotpass=function(){
        window.location.assign("http://localhost:1234/fpass.html");
    }
  });
