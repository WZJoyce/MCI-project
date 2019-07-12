var containerLogs = require('./containerLogs.js');
var expect=require('chai').expect;

describe('containerLogs', function() {
    it('containerLogstest', function() {
      expect(containerLogs()).to.be.equal(1);
    });
  });
  