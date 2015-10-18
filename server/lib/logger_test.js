/**
 * @module server/lib/logger_test.js
 */
'use strict';

var Code = require('code');
var Lab = require('lab');
var express = require('express');
var sinon = require('sinon');

var logger = require('./logger');

var lab = exports.lab = Lab.script();

var afterEach = lab.afterEach;
var beforeEach = lab.beforeEach;
var describe = lab.describe;
var expect = Code.expect;
var it = lab.it;

describe('server/lib/logger', function () {
  beforeEach(function (done) {
    //sinon.stub(express.prototype, 'listen').yieldsAsync();
    done();
  });

  afterEach(function (done) {
    //express.prototype.listen.restore();
    done();
  });

  it('test1', function (done) {
    done();
  });
});
