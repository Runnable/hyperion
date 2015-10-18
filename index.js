/**
 * @module index
 */
'use strict';

var server = require('server');

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
Hyperion.prototype.start = () => {
  server.start(this._opts);
};

module.exports = Hyperion;
