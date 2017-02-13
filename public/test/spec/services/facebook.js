'use strict';

describe('Service: facebook', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var facebook;
  beforeEach(inject(function (_facebook_) {
    facebook = _facebook_;
  }));

  it('should do something', function () {
    expect(!!facebook).toBe(true);
  });

});
