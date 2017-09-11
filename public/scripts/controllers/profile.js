'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ProfileCtrl', function ($scope,$window,webindex,profile,md5,requrl,$route,Upload) {

    //all ng-models declared
    $scope.profile={
        newUsername:"",
        newName:"",
        newArea:"",
        newCity:"",
        newState:"",
        newPincode:"",
        newCountry:"",
        countryCode:"",
        newMobile:"",
        VCode:"",
        oldPassword:"",
        newPassword:"",
        newPassword2:"",
        pic:"",
    };

///////////////////////////////

    $scope.ProfileForm=true;
    $scope.MobileForm=true;
    $scope.PasswordForm=true;
    $scope.UsernameForm=true;
    $scope.uploadPicForm=true;
    $scope.toggleButton=false;
    $scope.EditUsername="Edit Username";
    $scope.uploadButton="Upload image";
    $scope.profileUrl="/User_data/"+webindex.userData.useremail+"profile.jpeg";

//////Loading data from index service

    $scope.loadData=function(){
        if(webindex.userData.useremail!=undefined){
            var print=webindex.userData;
            var userInfo=webindex.userData.userinfo;

            $scope.Email=print.useremail;
            $scope.uName=print.username;
            if(print.mobile!=undefined){
                $scope.Mobile=print.mobile;
            }
            if(userInfo){
                $scope.Name=userInfo.fullname;
                $scope.Area=userInfo.area;
                $scope.City=userInfo.city;
                $scope.Pincode=userInfo.pincode;
                $scope.State=userInfo.state;
                $scope.Country=userInfo.country;
                $scope.FillPlaceholders();
            }
        }
    };

    var unregister=$scope.$watch(webindex.loaded,function(newValue,oldValue){
        if(!angular.equals(webindex.loaded, false)){
            $scope.loadData();
            unregister();
        }
    },true);


    $scope.$watch(function(){return webindex.userData},function(newValue,oldValue){
        if(!angular.equals(webindex.userData, {})){
            $scope.loadData();
        }
    },true);


/*  Optional function to load profile data from session instead of index service
    var promise = profile.getData();
    promise.then(function(data){

        var print=data.data;
        var userInfo=data.data.userinfo;
        if(print.useremail==undefined){
          $window.location.reload();
          $window.location.assign(requrl+"/#/login");
        }
        else{
          $scope.Email=print.useremail;
          $scope.uName=print.username;
          if(print.mobile!=undefined){
              $scope.Mobile=print.mobile;
          }
          if(userInfo){
            $scope.Name=userInfo.fullname;
            $scope.Area=userInfo.area;
            $scope.City=userInfo.city;
            $scope.Pincode=userInfo.pincode;
            $scope.State=userInfo.state;
            $scope.Country=userInfo.country;
            $scope.FillPlaceholders();
          }
        }
    },function(error){
        $window.location.reload();
        $window.location.assign(requrl+"/#/login");
    });
  */

 //////////// Show-Hide form button logic  ////////
    $scope.ShowProfileForm=function(){
      $scope.ProfileForm=false;
      $scope.ProfileFormButton=true;
      $scope.MobileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.Profile=true;
      $scope.toggleButton=false;
      $scope.UsernameForm=true;
      $scope.EditUsername="Edit Username";
      $scope.uploadPicForm=true;
      $scope.uploadButton="Upload image";
    };

    $scope.ShowMobileForm=function(){
      $scope.MobileForm=false;
      $scope.MobileFormButton=true;
      $scope.ProfileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.PasswordForm=true;
      $scope.ProfileForm=true;
      $scope.Profile=false;
      $scope.toggleButton=false;
      $scope.UsernameForm=true;
      $scope.EditUsername="Edit Username";
      $scope.uploadPicForm=true;
      $scope.uploadButton="Upload image";
    }

    $scope.ShowPasswordForm=function(){
      $scope.PasswordForm=false;
      $scope.PasswordFormButton=true;
      $scope.ProfileFormButton=false;
      $scope.MobileFormButton=false;
      $scope.MobileForm=true;
      $scope.ProfileForm=true;
      $scope.Profile=false;
      $scope.toggleButton=false;
      $scope.UsernameForm=true;
      $scope.EditUsername="Edit Username";
      $scope.uploadPicForm=true;
      $scope.uploadButton="Upload image";
    }

    $scope.toggleUsernameForm=function(){
      $scope.ProfileForm=true;
      $scope.ProfileFormButton=false;
      $scope.MobileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.Profile=false;

      if($scope.UsernameForm==true){
        $scope.UsernameForm=false;
        $scope.EditUsername="Cancel";
      }
      else{
        $scope.UsernameForm=true;
        $scope.EditUsername="Edit Username";
      }
  };

  $scope.toggleImageForm=function(){
      $scope.ProfileFormButton=false;
      $scope.MobileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.ProfileForm=true;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.Profile=false;

      if($scope.uploadPicForm==true){
        $scope.uploadPicForm=false;
        $scope.uploadButton="Cancel";
      }
      else{
        $scope.uploadPicForm=true;
        $scope.uploadButton="Upload image";
      }
  };

///////////// Edit profile logic //////////////
    $scope.FillPlaceholders=function(){
          $scope.profile.newName=$scope.Name;
          $scope.profile.newArea=$scope.Area;
          $scope.profile.newCity=$scope.City;
          $scope.profile.newPincode=$scope.Pincode;
          $scope.profile.newState=$scope.State;
          $scope.profile.newCountry=$scope.Country;
    }

    $scope.submitProfileForm=function (profForm) {
        if(profForm.$valid && $scope.profile.newCountry!=undefined){
          $scope.ProfileResult="Saving";
          $scope.changeProfile();
        }
        else if($scope.profile.newCountry==undefined){
          $scope.dataValid="Choose a country";
        }
        else{
          $scope.dataValid="Wrong or Incomplete info";
        }
    };

    $scope.changeProfile=function () {
        var country=$scope.profile.newCountry.replace(/['"]+/g,'');
        var profileObject={
          "fullname":$scope.profile.newName,
          "area":$scope.profile.newArea,
          "city":$scope.profile.newCity,
          "state":$scope.profile.newState,
          "pincode":$scope.profile.newPincode,
          "country":country,
        };

        var promise=profile.updateProfileData(profileObject);
        promise.then(function(data) {
          if(data.data.message==="unknown"){
            $scope.ProfileResult="Not LoggedIn";
            $window.location.reload();
          }
          else if(data.data.message==="success"){
            $scope.ProfileResult="Updated";
            webindex.needReload=true;
            $route.reload();
          }
          else{
            $scope.ProfileResult="Error! Try again later";
          }
        },function(error) {
            $scope.ProfileResult="Error! Try again later";
        });
    };

///////////////Add/Change Mobile no. logic ////////////////
    $scope.HideMobileForm=false;
    $scope.HideCodeForm=true;

    $scope.submitMobileForm=function(mobileForm){
        if(mobileForm.$valid){
            $scope.MobileMessage="Sending..";
            $scope.ChangeMobile();
        }
        else{
          $scope.MobileMessage="Enter valid details";
        }
    };

    $scope.ChangeMobile=function(){

        var MobileObject={
          "CountryCode":"+"+$scope.profile.countryCode,
          "MobileNumber":$scope.profile.newMobile,
        };

        var promise=profile.updateMobile(MobileObject);
        promise.then(function(data) {
          if(data.data.message==="unknown"){
            $window.location.reload();
          }
          else if(data.data.message==="success"){
            $scope.HideMobileForm=true;
            $scope.HideCodeForm=false;
          }
          else{
            $scope.MobileMessage="Error! Try again later";
          }
        },function(error) {
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
          "VCode":$scope.profile.VCode,
        };

        var promise=profile.verifyCode(CodeObject);
        promise.then(function(data) {
          if(data.data.message==="pass"){
            $scope.CodeMessage="Verified & Updated";
            webindex.needReload=true;
            $route.reload();
          }
          else if(data.data.message==="fail"){
            $scope.CodeMessage="Wrong Code entered";
          }
          else if(data.data.message==="unknown"){
            $scope.CodeMessage="Not LoggedIn";
            $window.location.reload();
          }
          else if(data.data.message==="exists"){
            $scope.CodeMessage=undefined;
            $scope.HideMobileForm=false;
            $scope.HideCodeForm=true;
            $scope.profile.VCode=undefined;
            $scope.MobileMessage="Mobile no. is already registered! Try another one";
          }
          else{
            $scope.CodeMessage="Error! Try again later";
          }
        },function(error) {
            $scope.CodeMessage="Error! Try again later";
        });
    };

    $scope.SendAgain=function(){
        $scope.profile.VCode=null;
        $scope.CodeMessage=undefined;
        $scope.MobileMessage=undefined;
        $scope.HideMobileForm=false;
        $scope.HideCodeForm=true;
    };

/////////// Change Password Logic /////////////////
    var arePasswordsSame=false;

    $scope.checkPassword=function(){
      if($scope.profile.newPassword2!=undefined)
      {
          if($scope.profile.newPassword===$scope.profile.newPassword2)
          {
            $scope.PasswordMessage="Passwords match";
            arePasswordsSame=true;
          }
          else if($scope.profile.newPassword==undefined){
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

      var hashOldPassword=md5.createHash($scope.profile.oldPassword);
      var hashNewPassword=md5.createHash($scope.profile.newPassword);
      var passwordObject={
          "oldpassword":hashOldPassword,
          "password1":hashNewPassword,
    };

    var promise=profile.setNewPassword(passwordObject);
    promise.then(function(data) {
      if(data.data.message==="success"){
          $scope.PasswordResult="Updated";
          $route.reload();
      }
      else if(data.data.message==="unknown"){
          $scope.PasswordResult="Not LoggedIn";
          $window.location.reload();
      }
      else if(data.data.message==="fail"){
          $scope.PasswordResult="Old Password is not correct";
      }
      else{
          $window.location.reload();
      }
      },function(error) {
          $scope.PasswordResult="Error occured! Try again later";
      });
    };

///////////// Change Username  ////////////////
    $scope.UsernameMessage=null;
    var isUsernameNew=false;
    $scope.disableButton=true;

    $scope.checkUsername=function(usernameForm){
        $scope.disableButton=true;
        isUsernameNew=false;
        $scope.UsernameMessage=null;
        if($scope.profile.newUsername===$scope.uName){
          $scope.UsernameMessage="Same as current username";
        }
        else if(usernameForm.newusername.$valid){
          $scope.UsernameMessage="Checking...";
          $scope.checkInDb();
        }
    };

    $scope.checkInDb=function(){
        var usernameObj = {
          "username":$scope.profile.newUsername,
        };

        var promise = profile.checkUsername(usernameObj);
        promise.then(function(data){
          if(data.data.message==="found"){
              $scope.UsernameMessage = "Username Taken";
          }
          else{
              $scope.UsernameMessage = "Nice Choice!";
              isUsernameNew=true;
              $scope.disableButton=false;
          }
        },function(error){
          $scope.UsernameMessage = "Error occured! Try again later";
        });
    };


    $scope.submitUsernameForm=function(usernameForm){

      if(usernameForm.$valid && isUsernameNew==true){
        $scope.toggleButton=true;
        $scope.UsernameResult="Checking username..";
        $scope.ChangeUsername();
      }
      else{
          $scope.UsernameResult="Enter a valid username";
      }
    };

    $scope.ChangeUsername=function(){

      var UsernameObject={
        "Username":$scope.profile.newUsername
      }
      var promise=profile.changeUsername(UsernameObject);
      promise.then(function(data){
        if(data.data.message==="success"){
          $scope.UsernameResult="Username changed";
          webindex.needReload=true;
          $route.reload();
        }
        else if(data.data.message==="unknown"){
          $scope.UsernameResult="Not LoggedIn";
          $window.location.reload();
        }
        else if(data.data.message==="taken"){
          isUsernameNew=false;
          $scope.UsernameMessage = "Username Taken";
          $scope.UsernameResult="Username already taken";
          $scope.toggleButton=false;
        }
        else{
          $scope.UsernameResult="Error occured!Try again Later";
        }
      },
      function(error){
        $scope.UsernameResult="Error occured!Try again Later";
      });
    };

    ////////////// Profile pic upload //////////////
    $scope.uploadPic=function(){
       if ($scope.uploadForm.file.$valid && $scope.profile.pic) {
            $scope.upload($scope.profile.pic);
            $scope.picMessage="Uploading.."
       }
       else{
            $scope.picMessage="Invalid image";
       }
    }

    $scope.upload = function (file) {
        Upload.upload({
            url: requrl+'/profile/uploadPic', //webAPI exposed to upload the file
            data:{file:file}               //pass file as data, should be user ng-model
        }).then(function (data) {
            if(data.data.message==="success"){
                $scope.picMessage="Upload successfull";
                var random = (new Date()).toString();
                $scope.profileUrl = $scope.profileUrl + "?cb=" + random;
                $scope.uploadPicForm=true;
                $scope.uploadButton="Upload";
                $scope.picMessage=undefined;
            }
            else if(data.data.message==="unknown"){
              $scope.picMessage="Not LoggedIn";
              $window.location.reload();
            }
            else{
                $scope.picMessage="Upload fail";
            }
        }, function (error) {
            $scope.picMessage="Upload fail";
        });
    };
    //Addons possible
    // can be dynamic path
    // file size
    // progress bar
    // show file size with validation text

  });
