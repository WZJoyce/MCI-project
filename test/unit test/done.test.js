var done = require('./done.js');
var expect=require('chai').expect;

describe('donetest', function() {
    it('donetesttry', function() {
      expect(done()).to.be.equal(1);
    });
  });
  