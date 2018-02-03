'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:WebindexCtrl
 * @description
 * # WebindexCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('WebindexCtrl', function ($scope, webindex, requrl, $window, $timeout, $rootScope, $location) {

    $scope.loading_screen = pleaseWait({
      logo: "../images/Loading_Text.png",
      backgroundColor: '#11B8FF',
      //loadingHtml: "<div class='sk-wandering-cubes'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div></div>"
      loadingHtml: "<div class='sk-wave'><div class='sk-rect sk-rect1'></div><div class='sk-rect sk-rect2'></div><div class='sk-rect sk-rect3'></div><div class='sk-rect sk-rect4'></div><div class='sk-rect sk-rect5'></div></div>"
      //look in spinkit.css for more loading animations
    });

    $scope.redirect = function () {
      if (webindex.loaded === true && webindex.loggedIn === true) {
        if ($location.path() === '/login' || $location.path() === '/signup') {
          $location.path('/');
        }
      }
      else if (webindex.loaded === true && webindex.loggedIn != true) {
        if ($location.path() === '/profile') {
          $location.path('/login');
        }
      }
    };

    $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
      $scope.redirect();
    });


    $scope.loginStatus = "Login/SignUp";
    $scope.ActivationStatus = true;
    $scope.LoginButton = false;
    $scope.SignupButton = false;
    $scope.ProfileButton = true;
    $scope.LogoutButton = true;

    $scope.ActivationMessage = undefined;

    $scope.loadData = function () {
      var promise = webindex.checkStatus();
      promise.then(function (data) {
        if (data.data.message === "fail") {
          $scope.loginStatus = "Login/SignUp";
        }
        else if (data.data.Message != undefined) {
          $scope.loginStatus = data.data.Message;
          webindex.userData = data.data.userData;

          if (data.data.Email != undefined && data.data.ActivationStatus === false) {
            $scope.Status = "Your Email address " + data.data.Email + " is not Verified";
            $scope.ActivationStatus = false;

          }
          webindex.loggedIn = true;
          $scope.LoginButton = true;
          $scope.SignupButton = true;
          $scope.ProfileButton = false;
          $scope.LogoutButton = false;
        }
        else {
          $scope.loginStatus = "Login/SignUp";
        }
        webindex.needReload = false;
        webindex.loaded = true;
        $scope.redirect();
      });
    };

    $scope.$watch(function () { return webindex.needReload }, function (newValue, oldValue) {
      if (webindex.needReload === true) {
        $scope.loadData();
      }
    }, true);

    ////////////////////////////
    $scope.sendLinkButton = false;

    $scope.SendActivationLink = function () {
      var promise = webindex.sendActivationLink();
      promise.then(function (data) {
        if (data.data.message === "success") {
          $scope.ActivationMessage = "Link Sent. Wait for 1 minute to send new link";
          $scope.sendLinkButton = true;
          $timeout(function () {
            $scope.sendLinkButton = false;
            $scope.ActivationMessage = undefined;
          }, 60000);
        }
        else if (data.data.message === "unknown") {
          $window.location.reload();
        }
        else {
          $scope.ActivationMessage = "Error,Try again Later";
        }
      }, function (error) {
        $scope.ActivationMessage = "Error,Try again Later";
      });
    };

    ///////////////////////////////
    $scope.Logout = function () {
      var promise = webindex.logout();
      promise.then(function (data) {
        $window.location.reload();
      }, function (error) {
        $scope.LogoutMessage = "Error,Try again Later";
      });
    };

  });
