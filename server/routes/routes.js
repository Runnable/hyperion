/**
 * Primary API endpoint route handlers
 * @module server/lib/routes/routes
 */
'use strict';

var log = require('lib/logger')(__filename);
var app = require('app');

var exports = module.exports;

/**
 * GET /sequences
 */
exports._getSequences = [];

/**
 * GET /sequences/:id
 */
exports._getSequence = [];

var _routes = exports._routes = [
//  ['get', '/sequences', exports._getSequences],
//  ['get', '/sequences/:id', exports._getSequence]
];

/**
 * Bind route middlewares to request paths
 * @param {Object} app instance of express
 */
exports.initialize = () => {
  _routes.forEach((route) => {
    log.trace([
      'Route loaded:',
    ].concat(route).join(' '));
    app[route[0]](route[1], route[2]);
  });
};
