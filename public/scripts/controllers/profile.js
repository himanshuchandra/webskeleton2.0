'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ProfileCtrl', function ($scope,$window,profile,md5,requrl) {

    $scope.ProfileForm=true;
    $scope.MobileForm=true;
    $scope.PasswordForm=true;
    

      var promise = profile.getData();
        promise.then(function(data){
            console.log("SUCCESS ",data);

            var print=data.data["0"];
            var userInfo=data.data["0"].userinfo;
//            console.log(data.data["0"].username);
            if(print.useremail==undefined){
              //console.log("lllll");
              $window.location.assign(requrl+"/#/login");
            }
            else{
              $scope.Email=print.useremail;
              $scope.uName=print.username;
            
              if(userInfo){
                console.log("insiode",userInfo);
                $scope.Name=userInfo.fullname;
                $scope.Area=userInfo.area;
                $scope.City=userInfo.city;
                $scope.Pincode=userInfo.pincode;
                $scope.State=userInfo.state;
                $scope.Country=userInfo.country;
                $scope.Mobile=print.mobile;
                $scope.FillPlaceholders();

              }
            }
            
        },function(error){
            $scope.result = "error occured";
        });
 /////////////////////////////////////////////////////////////////////////

          $scope.ShowProfileForm=function(){
            $scope.ProfileForm=false;
            $scope.ProfileFormButton=true;
            $scope.MobileFormButton=false;
            $scope.PasswordFormButton=false;
            $scope.MobileForm=true;
            $scope.PasswordForm=true;
            $scope.Profile=true;


          };

          $scope.ShowMobileForm=function(){
            $scope.MobileForm=false;
            $scope.MobileFormButton=true;
            $scope.ProfileFormButton=false;
            $scope.PasswordFormButton=false;
            $scope.PasswordForm=true;
            $scope.ProfileForm=true;
            $scope.Profile=false;
          }

          $scope.ShowPasswordForm=function(){
            $scope.PasswordForm=false;
            $scope.PasswordFormButton=true;
            $scope.ProfileFormButton=false;
            $scope.MobileFormButton=false;
            $scope.MobileForm=true;
            $scope.ProfileForm=true;
            $scope.Profile=false;
          }


//////////////////////////////////////////////////////////////////////////
          
          $scope.FillPlaceholders=function(){
                $scope.newName=$scope.Name;
                $scope.newArea=$scope.Area;
                $scope.newCity=$scope.City;
                $scope.newPincode=$scope.Pincode; 
                $scope.newState=$scope.State;
                $scope.newCountry=$scope.Country;
          }

          $scope.submitProfileForm=function (profForm) {  
              if(profForm.$valid && $scope.newCountry!=undefined){
                $scope.ProfileResult="Saving";
                $scope.changeProfile();
      
               // $scope.saveprof();
              }
              else if($scope.newCountry==undefined){
                $scope.dataValid="Choose a country";
              }
              else{
                $scope.dataValid="Wrong or Incomplete info";
              }

          };

          $scope.changeProfile=function () {
              var profileObject={
                "fullname":$scope.newName,
                "area":$scope.newArea,
                "city":$scope.newCity,
                "state":$scope.newState,
                "pincode":$scope.newPincode,
                "country":$scope.newCountry,

              };
              
              var promise=profile.setProfileData(profileObject);
              promise.then(function(data) {
                $scope.ProfileResult="Updated";
                $window.location.reload();

             
              },function(error) {
                console.log("error occured");
                $scope.ProfileResult="Error! Try again later";
                
              });
              
            };
/////////////////////////////////////////////////////////////////////
          $scope.HideMobileForm=false;
          $scope.HideCodeForm=true;
          $scope.countryCode="91";

          $scope.submitMobileForm=function(mobileForm){
             if(mobileForm.$valid){
                    $scope.ChangeMobile();
           
            }
            else{
              $scope.MobileMessage="Enter valid details";
            }
          };

          $scope.ChangeMobile=function(){
        
              var MobileObject={
                "CountryCode":"+"+$scope.countryCode,
                "MobileNumber":$scope.newMobile,
              };

              var promise=profile.UpdateMobile(MobileObject);
              promise.then(function(data) {
              console.log(data);
                //$scope.MobileMessage="Updated";
              $scope.HideMobileForm=true;
              $scope.HideCodeForm=false;
                //$window.location.reload();
             
              },function(error) {
                console.log("error occured");
                $scope.MobileMessage="Error! Try again later";
                
              });    

          };

          $scope.submitCode=function(codeForm){
            if(codeForm.$valid){
              $scope.CodeMessage="Checking Code..";
              $scope.VerifyCode();
           
            }
            else{
              $scope.CodeMessage="Enter valid code";
            }
          };

          $scope.VerifyCode=function(){
              var CodeObject={
                "VCode":$scope.VCode,
              };

              var promise=profile.VerifyCode(CodeObject);
              promise.then(function(data) {
              console.log(data);
              if(data.data.message==="pass"){
                $scope.CodeMessage="Verified & Updated";
                $window.location.reload();
              }
              else if(data.data.message==="fail"){
                $scope.CodeMessage="Wrong Code entered";
              }
              else{
                $scope.CodeMessage="Error! Try again later";
              }
                //$scope.MobileMessage="Updated";
                
                //$window.location.reload();
              },function(error) {
                console.log("error occured");
                $scope.CodeMessage="Error! Try again later";
                
              });    
          };

          $scope.SendAgain=function(){
              $scope.VCode=null;
              $scope.CodeMessage=undefined;
              $scope.HideMobileForm=false;
              $scope.HideCodeForm=true;
          };

///////////////////////////////////////////////////////////////////////
          var arePasswordsSame=false;
    
          $scope.checkPassword=function(){
          if($scope.newPassword2!=undefined)
          {   
              if($scope.newPassword===$scope.newPassword2)
              {   
                $scope.PasswordMessage="Passwords match";
                arePasswordsSame=true;
                
              }
              else if($scope.newPassword==undefined){
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
                    $scope.changePassword();
                    $scope.PasswordResult="Updating Password";
           
            }
            else{
              $scope.PasswordResult="Enter correct passwords";
            }
          };
          
           $scope.changePassword=function () {

             var hashOldPassword=md5.createHash($scope.oldPassword);
             var hashNewPassword=md5.createHash($scope.newPassword);
              var passwordObject={
                  "oldpassword":hashOldPassword,
                  "password1":hashNewPassword,
              };
              
              var promise=profile.setNewPassword(passwordObject);
              promise.then(function(data) {
                console.log("ddd",data);
                if(data.data.msg==="success"){
                    $scope.PasswordResult="Updated";
                    $window.location.reload();
                }
                else
                {
                    $scope.PasswordResult="Old Password is not correct";
                }
                //$scope.PasswordResult="Password Changed";
              },function(error) {
                console.log("error occured");
                
              });
              
            };


  });
