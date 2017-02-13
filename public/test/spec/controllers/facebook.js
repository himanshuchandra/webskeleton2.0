'use strict';

describe('Controller: FacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var FacebookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FacebookCtrl = $controller('FacebookCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FacebookCtrl.awesomeThings.length).toBe(3);
  });
});
