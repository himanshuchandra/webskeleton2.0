'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.webindex
 * @description
 * # webindex
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('webindex', function () {
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
