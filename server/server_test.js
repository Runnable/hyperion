/**
 * @module server/server_test.js
 */
'use strict';

var Code = require('code');
var Lab = require('lab');
var sinon = require('sinon');
var rewire = require('rewire');

var server = rewire('./server');

var lab = exports.lab = Lab.script();

var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('server/server', function () {
  var ctx;
  beforeEach(function (done) {
    ctx = {};
    ctx.log = server.__get__('log');
    sinon.stub(ctx.log, 'trace');
    sinon.stub(ctx.log, 'error');
    done();
  });

  afterEach(function (done) {
    ctx.log.trace.restore();
    ctx.log.error.restore();
    done();
  });

  it('should log connection error', function (done) {
    server._expressListenCallback();
    expect(ctx.log.error.callCount).to.equal(0);
    expect(ctx.log.trace.callCount).to.equal(1);
    done();
  });

  it('should log connection success', function (done) {
    var error = new Error();
    server._expressListenCallback(error);
    expect(ctx.log.error.args[0][0].err).to.equal(error);
    expect(ctx.log.error.callCount).to.equal(1);
    expect(ctx.log.trace.callCount).to.equal(0);
    done();
  });
});
