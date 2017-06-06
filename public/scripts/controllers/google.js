'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:GoogleCtrl
 * @description
 * # GoogleCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('GoogleCtrl', function ($scope,$window,requrl,socialsignin) {


    // var AuthToken=null;
    // var GEmail=null;
    // var FullName=null;

    // $scope.SignInGoogle = function () {
    //     GooglePlus.login().then(function (authResult) {
    //         AuthToken=authResult.access_token;
    //         GooglePlus.getUser().then(function (user) {
    //             GEmail=user.email;
    //             FullName=user.name;
    //             if(GEmail!=undefined){
    //                 $scope.DoSignInGoogle();
    //             }
    //             else{
    //                 $scope.GoogleMessage="Error! Try again later or use the login form."
    //             }
    //         },
    //         function(err){
    //             $scope.GoogleMessage="Error! Try again later or use the login form."
    //         });
    //     },
    //     function (err) {
    //         $scope.GoogleMessage="Error connecting to Google! Try again later or use the login form."
    //     });
    // };  
    //OPTIONAL
    //Verified fields from google that can be accessed
        //Full name
        //email
        //given_name
        //family_name
        //picture url google+
        //D.O.B.
        //Gender
        //Country
        //g+ id
        //g+ link
        
    //Access Urls
        /*
        var client_id="CLIENT ID";
    	var scope="email";
    	var redirect_uri="http://localhost:9000";
    	var response_type="token";
    	var Url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
    	"&response_type="+response_type;
        var Url2=https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token="Enter token recieved"
        */

    // $scope.DoSignInGoogle=function(){
    //     var GoogleObject={
    //         "Email":GEmail,
    //         "FullName":FullName,
    //         "Social":"Google"
    //     }

    //     var promise = socialsignin.socialSignin(GoogleObject);
    //     promise.then(function(data){
    //         if(data.data.message==="loggedIn"){
    //             $scope.GoogleMessage="Successfully LoggedIn";
    //             $window.location.reload();
    //             $window.location.assign(requrl);
    //         }
    //         else if(data.data.message==="registered"){
    //             $scope.GoogleMessage="Successfully Registered & LoggedIn";
    //             $window.location.reload();
    //             $window.location.assign(requrl);
    //         }
    //         else{
    //             $scope.GoogleMessage="Error! Try again later or use the login form.";
    //         }
    //     },function(error){
    //         $scope.GoogleMessage = "Error! Try again later or use the login form.";
    //     });
    // };
});
