'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.socialsignin
 * @description
 * # socialsignin
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('socialsignin', function () {
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
