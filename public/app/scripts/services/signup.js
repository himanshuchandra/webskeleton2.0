'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.signup
 * @description
 * # signup
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('signup', function () {
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
