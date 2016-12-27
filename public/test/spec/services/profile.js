'use strict';

describe('Service: profile', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var profile;
  beforeEach(inject(function (_profile_) {
    profile = _profile_;
  }));

  it('should do something', function () {
    expect(!!profile).toBe(true);
  });

});
