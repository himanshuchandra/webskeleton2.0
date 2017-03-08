'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:FacebookCtrl
 * @description
 * # FacebookCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
.run( function( $rootScope ) {
  // Load the facebook SDK asynchronously
  (function(){
     // If we've already installed the SDK, we're done
     if (document.getElementById('facebook-jssdk')) {return;}

     // Get the first script element, which we'll use to find the parent node
     var firstScriptElement = document.getElementsByTagName('script')[0];

     // Create a new script element and set its id
     var facebookJS = document.createElement('script'); 
     facebookJS.id = 'facebook-jssdk';

     // Set the new script's source to the source of the Facebook JS SDK
     facebookJS.src = '//connect.facebook.net/en_US/all.js';

     // Insert the Facebook JS SDK into the DOM
     firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
   }());
})

.controller('FacebookCtrl', function ($scope,$window,requrl,$facebook,socialsignin) {

  var FEmail=null;
  var FullName=null;

  $scope.SignInFacebook = function() {
    try{
      $facebook.login().then(function() {
        $scope.Refresh();
      });
    }
    catch(exception){
            $scope.FacebookMessage="Error connecting to Facebook! Try again later."
        }
  };

  $scope.Refresh = function() {
    $facebook.api("/me?fields=id,name,email").then( 
      function(response) {
        FEmail=response.email;
        FullName=response.name;
        if(FEmail!=undefined){
            $scope.DoSignInFacebook();
        }
        else{
            $scope.FacebookMessage="No Email recieved from facebook!"
        }
      },
      function(err) {
        $scope.FacebookMessage = "Error connecting to facebook!";
      });
  };

  $scope.DoSignInFacebook=function(){
    var FacebookObject={
        "Email":FEmail,
        "FullName":FullName,
        "Social":"Faceboook"
    }

    var promise = socialsignin.SocialSignin(FacebookObject);
    promise.then(function(data){
        console.log("SUCCESS ",data);
        $scope.FacebookMessage=data.data.message;
        $window.location.reload();
        $window.location.assign(requrl);

    },function(error){
        $scope.FacebookMessage = "Error occurred";
    });
};

});
//End Urls For facebook
//https://www.facebook.com/v2.8/dialog/oauth?response_type=token&display=popup&client_id="Enter clientID"&redirect_uri=https%3A%2F%2Fdevelopers.facebook.com%2Ftools%2Fexplorer%2Fcallback&scope=email

//https://graph.facebook.com/me?access_token="Enter access token recieved"&fields=email,name
