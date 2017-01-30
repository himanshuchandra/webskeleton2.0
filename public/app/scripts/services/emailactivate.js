'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.emailactivate
 * @description
 * # emailactivate
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('emailactivate', function () {
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
