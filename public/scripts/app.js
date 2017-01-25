'use strict';

/**
 * @ngdoc overview
 * @name webskeletonApp
 * @description
 * # webskeletonApp
 *
 * Main module of the application.
 */
angular
  .module('webskeletonApp', [
    'ngAnimate',
    'ngCookies',
    'ngRoute',
    'angular-md5',
    'countrySelect'
  ])
  .constant("requrl","http://localhost:1234")
  .config(function ($routeProvider,$locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.hashPrefix('');
  });

