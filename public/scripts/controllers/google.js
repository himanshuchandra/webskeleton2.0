'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:GoogleCtrl
 * @description
 * # GoogleCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('GoogleCtrl', function ($scope,$window,requrl,google,GooglePlus) {


    var AuthToken=null;
    var GEmail=null;
    var FullName=null;

    $scope.SignInGoogle = function () {
        GooglePlus.login().then(function (authResult) {
            //console.log(authResult);
            AuthToken=authResult.access_token;
            console.log(AuthToken);
            GooglePlus.getUser().then(function (user) {
                //console.log(user);
                GEmail=user.email;
                FullName=user.name;
                console.log(GEmail,FullName);
                if(GEmail!=undefined){
                    $scope.DoSignInGoogle();
                }
                else{
                    $scope.GoogleMessage="Error occured! Try again later."
                }

            });
        },
        function (err) {
            console.log(err);
            $scope.GoogleMessage="Error connecting to Google! Try again later."
        });
    };  
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

        $scope.DoSignInGoogle=function(){
            var GoogleObject={
                "Email":GEmail,
                "FullName":FullName
            }

            var promise = google.GoogleSignin(GoogleObject);
            promise.then(function(data){
                console.log("SUCCESS ",data);
                $scope.GoogleMessage=data.data.message;
                $window.location.reload();
                $window.location.assign(requrl);
   
            },function(error){
                $scope.GoogleMessage = "Error occurred";
            });
        };


  });
