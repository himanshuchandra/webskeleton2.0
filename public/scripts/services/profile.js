'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.profile
 * @description
 * # profile
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('profile', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
