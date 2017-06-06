'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:FacebookCtrl
 * @description
 * # FacebookCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')

.controller('FacebookCtrl', function ($scope,$window,requrl,socialsignin,$location,$http) {


// //   var FEmail=null;
// //   var FullName=null;

//   $scope.DoSignInFacebook=function(){
//     var FacebookObject={
//         "Email":FEmail,
//         "FullName":FullName,
//         "Social":"Faceboook"
//     }

//     var promise = socialsignin.socialSignin(FacebookObject);
//     promise.then(function(data){
//         if(data.data.message==="loggedIn"){
//             $scope.FacebookMessage="Successfully LoggedIn";
//             $window.location.reload();
//             $window.location.assign(requrl);
//         }
//         else if(data.data.message==="registered"){
//             $scope.FacebookMessage="Successfully Registered & LoggedIn";
//             $window.location.reload();
//             $window.location.assign(requrl);
//         }
//         else{
//             $scope.FacebookMessage="Error! Try again later or use the login form.";
//         }
//     },function(error){
//         $scope.FacebookMessage = "Error! Try again later or use the login form.";
//     });
//   };

    // $scope.SignInFacebook=function(){
    //     // var promise=socialsignin.socialFacebook();
    //     // promise.then(function(data){
    //     //     console.log(data);
    //     // },function(error){
    //     // $scope.FacebookMessage = error;
    //     // })
    //     $http.post('/social/socialFacebook');
    // };

});
//End Urls For facebook
//https://www.facebook.com/v2.8/dialog/oauth?response_type=token&display=popup&client_id="Enter clientID"&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback&scope=email

//https://graph.facebook.com/me?access_token="Enter access token recieved"&fields=email,name
