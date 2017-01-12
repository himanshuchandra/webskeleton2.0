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

            
            console.log(data["0"].username);
            //var finaldata = data.data.finaldata;
            //signup.passdata(finaldata);
            //$scope.profilename= data;
            
            $scope.result = data.data.msg;
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
