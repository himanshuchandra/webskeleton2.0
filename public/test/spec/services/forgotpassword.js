'use strict';

describe('Service: forgotpassword', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var forgotpassword;
  beforeEach(inject(function (_forgotpassword_) {
    forgotpassword = _forgotpassword_;
  }));

  it('should do something', function () {
    expect(!!forgotpassword).toBe(true);
  });

});
