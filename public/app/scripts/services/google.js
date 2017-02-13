'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.google
 * @description
 * # google
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('google', function () {
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
