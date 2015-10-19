/**
 * @module index
 */
'use strict';

var server = require('./server/server');

/**
 * @class
 * @param {Object} opts
 */
function Hyperion (opts) {
  this._opts = opts;
}

/**
 * Initialize the hyperion server and
 * listen for incoming requests
 */
Hyperion.prototype.start = function () {
  server.start(this._opts);
};

module.exports = Hyperion;
