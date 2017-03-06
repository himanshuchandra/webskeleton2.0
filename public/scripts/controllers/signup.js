'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('SignupCtrl',function ($scope,signup,$window,md5,requrl) {
   
////////////Checking if username exists//////////////
    $scope.UsernameMessage=null;
    var isUsernameNew=false;

    $scope.checkUsername=function(regForm){
        $scope.isNotValid=true;
        isUsernameNew=false;
        if(regForm.validusername.$valid){
            $scope.UsernameMessage="Checking...";
            $scope.checkInDb(regForm);
        }
        else{
            $scope.UsernameMessage=null;
        }
    };

    $scope.checkInDb=function(regForm){

        var usernameObj = {
            "username":$scope.username,
        };
        
      var promise = signup.checkUsername(usernameObj);
        promise.then(function(data){
           // console.log("SUCCESS ",data);
           // console.log(data.data);
           if(data.data.message==="found"){
               $scope.UsernameMessage = "Username Taken";
               isUsernameNew=false;
           }
           else{
               $scope.UsernameMessage = "Nice Choice!";
               isUsernameNew=true;
               $scope.enableRegister(regForm);
           }            
        },function(error){
           // $scope.result = "Error occured! Try again later";
        });
    };

//////////////Enable Register code/////////
    $scope.isNotValid=true;
    $scope.enableRegister=function(regForm){
        if(regForm.$valid && passverified==true && isUsernameNew==true){
            $scope.isNotValid=false;
        }
        else{
            $scope.isNotValid=true;
        }
    };

//////////////Match Passwords //////////
    var passverified=false;
    $scope.checkp=function(regForm){
        $scope.isNotValid=true;
        if($scope.password2!=undefined)
        {   
            if($scope.password1===$scope.password2)
            {   
                $scope.passtext="Passwords match";
                passverified=true;  
                $scope.enableRegister(regForm);
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
    
/////////////////////////Password Encryption///////////////////////////////





////////////////////Registering The user////////////////////////////////////    
    $scope.submitForm=function(regForm){
        if(regForm.$valid && passverified==true && isUsernameNew==true){
            $scope.doRegister();
        }
        else{
            $scope.result="Enter correct and full info";
        }
    };
       
   
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
           // console.log("SUCCESS ",data);
           // console.log(data.data);
           if(data.data.message==="pass"){
               $scope.result = "Registered Successfully";
               $window.location.reload();
               $window.location.assign(requrl);
           }
           else if(data.data.message==="UsernameTaken"){
               $scope.UsernameMessage = "Username Taken";
               isUsernameNew=false;
               $scope.result ="Sorry!The username is already taken";
           }  
           else if(data.data.message==="EmailTaken"){
               $scope.result ="Email already registered!";
           }         
        },function(error){
            $scope.result = "Error occured! Try again later";
        });
    }
  });
