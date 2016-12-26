'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.login
 * @description
 * # login
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('login', function () {
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
