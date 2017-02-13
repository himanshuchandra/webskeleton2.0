'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.facebook
 * @description
 * # facebook
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('facebook', function () {
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
