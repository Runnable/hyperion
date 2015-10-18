/**
 * @module server/lib/logger_test.js
 */
'use strict';

var Code = require('code');
var Lab = require('lab');

var logger = require('./logger');

var lab = exports.lab = Lab.script();

var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('server/lib/logger', function () {
  it('should return child instance of logger from generator', function (done) {
    var childLogger = logger('some/path');
    expect(childLogger).to.be.an.object();
    done();
  });
});
