'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.forgotpassword
 * @description
 * # forgotpassword
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('forgotpassword', function () {
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
