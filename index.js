/**
 * @module index
 */
'use strict';

var main = require('./server/main');

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
  main.start(this._opts);
};

module.exports = Hyperion;
