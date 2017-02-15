'use strict';

describe('Controller: FinalizeCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var FinalizeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FinalizeCtrl = $controller('FinalizeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FinalizeCtrl.awesomeThings.length).toBe(3);
  });
});
