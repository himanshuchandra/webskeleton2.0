'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('SignupCtrl',function ($scope,signup,$window,md5) {
   
    var passverified=false;
    
    $scope.checkp=function(){
        if($scope.password2!=undefined)
        {   
            if($scope.password1===$scope.password2)
            {   
                $scope.passtext="Passwords match";
                passverified=true;  
            }
  
            else if($scope.password1==undefined){
                 $scope.passtext="";
                 passverified=false;
            }
            else{
                $scope.passtext="Passwords dont match";
                passverified=false;
                
            }
        }
    }
    
        $scope.submitForm=function(regForm){
           // console.log(regForm.$valid);
                if(regForm.$valid && passverified==true){
                    $scope.doRegister();
                }
                else{
                    $scope.passtext="Enter correct and full info";
                }
                
            }
       
   
    $scope.doRegister=function(){
        
        var hashPassword=md5.createHash($scope.password1);

        var userObject = {
            "useremail":$scope.useremail,
            "username":$scope.username,
            "password1":hashPassword,
            "role":"customer"
            //"forgotpasscode":0,
            /*"mobile":0,
            "address":[{"area":"null","city":"null","state":"null","pincode":0,"country":"null"}]*/
        };
        
      var promise = signup.registerUser(userObject);
        promise.then(function(data){
            console.log("SUCCESS ",data);
            console.log(data.data);
            //var finaldata = data.data.finaldata;
            //signup.passdata(finaldata);
            //$scope.profilename= data;
            
            $scope.result = data.data.msg;
            //$window.location.assign("http://localhost:1234/profile.html");
        
            
            
        },function(error){
            $scope.result = "error occured";
        });
    }
  });
