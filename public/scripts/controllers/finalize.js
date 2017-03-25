'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:FinalizeCtrl
 * @description
 * # FinalizeCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('FinalizeCtrl', function ($timeout,$scope) {
  $scope.loading_screen.finish();
});


