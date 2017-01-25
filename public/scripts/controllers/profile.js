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
            var userInfo=data.data["0"].userinfo["0"];
//            console.log(data.data["0"].username);

            $scope.Email=print.useremail;
            $scope.uName=print.username;
            
            if(userInfo.length!=0){
              console.log("insiode"+userInfo.fullname);
                 $scope.Name=userInfo.fullname;
                 $scope.Pincode=userInfo.pincode;

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
      

          $scope.submitForm=function (profForm) {  
              if(profForm.$valid){
                $scope.saveprof();
              }
              else{
                console.log("Wrong info");
              }

          }


          $scope.submitForm=function(passForm){
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
