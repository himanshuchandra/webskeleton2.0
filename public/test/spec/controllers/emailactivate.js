'use strict';

describe('Controller: EmailactivateCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var EmailactivateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailactivateCtrl = $controller('EmailactivateCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EmailactivateCtrl.awesomeThings.length).toBe(3);
  });
});
