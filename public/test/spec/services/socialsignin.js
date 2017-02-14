'use strict';

describe('Service: socialsignin', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var socialsignin;
  beforeEach(inject(function (_socialsignin_) {
    socialsignin = _socialsignin_;
  }));

  it('should do something', function () {
    expect(!!socialsignin).toBe(true);
  });

});
