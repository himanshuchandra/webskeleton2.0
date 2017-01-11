'use strict';

describe('Controller: WebindexCtrl', function () {

  // load the controller's module
  beforeEach(module('webskeletonApp'));

  var WebindexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WebindexCtrl = $controller('WebindexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WebindexCtrl.awesomeThings.length).toBe(3);
  });
});
