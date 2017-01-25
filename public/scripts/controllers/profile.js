'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('ProfileCtrl', function ($scope,profile) {

      var promise = profile.getData();
        promise.then(function(data){
            console.log("SUCCESS ",data);

            var print=data.data["0"];
            var userInfo=data.data["0"].userinfo;
//            console.log(data.data["0"].username);

            $scope.Email=print.useremail;
            $scope.uName=print.username;
            
            if(userInfo.length!=0){
              console.log("insiode"+userInfo[0].fullname);
                 $scope.Name=userInfo[0].fullname;
                 $scope.Pincode=userInfo[0].pincode;

            }
            
            //$scope.Name=data.data["0"].fullname;
            //$scope.address=data.data["0"].;
            //$scope.Email=data.data["0"].useremail;

           
            //var finaldata = data.data.finaldata;
            //signup.passdata(finaldata);
            //$scope.profilename= data;
            //console.log("sss"+data.data.msg);
            //$scope.result = data.data.msg;
            //$window.location.assign("http://localhost:1234/profile.html");
        
            
            
        },function(error){
            $scope.result = "error occured";
        });
      

          $scope.submitProfileForm=function (profForm) {  
              if(profForm.$valid){
                console.log("valid all");
               // $scope.saveprof();
              }
              else{
                console.log("Wrong or Incomplete info");
              }

          }

          $scope.submitMobileForm=function(mobileForm){
             if(mobileForm.$valid){
                    $scope.changeMobile();
           
            }
            else{
              $scope.result="Enter a valid mobile number";
            }
          }

          $scope.submitPasswordForm=function(passForm){
             if(passForm.$valid){
                    $scope.changePass();
           
            }
            else{
              $scope.result="Enter correct password";
            }
          }



          $scope.changePass=function () {  
              $scope.result="passchanged";
          }

  });
