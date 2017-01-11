'use strict';

describe('Service: webindex', function () {

  // load the service's module
  beforeEach(module('webskeletonApp'));

  // instantiate service
  var webindex;
  beforeEach(inject(function (_webindex_) {
    webindex = _webindex_;
  }));

  it('should do something', function () {
    expect(!!webindex).toBe(true);
  });

});
