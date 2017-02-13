'use strict';

describe('Controller: GoogleCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var GoogleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GoogleCtrl = $controller('GoogleCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(GoogleCtrl.awesomeThings.length).toBe(3);
  });
});
