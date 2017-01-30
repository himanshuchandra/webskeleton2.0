'use strict';

describe('Service: emailactivate', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var emailactivate;
  beforeEach(inject(function (_emailactivate_) {
    emailactivate = _emailactivate_;
  }));

  it('should do something', function () {
    expect(!!emailactivate).toBe(true);
  });

});
