/**
 * @module server/lib/routes/client
 */
'use strict';

var log = require('logger')(__filename);

var exports = module.exports;

var _routes = exports._routes = [
  ['get', '/', exports._getIndex]
];

exports.initialize = (app) => {
  _routes.forEach((route) => {
    log.trace([
      'Route loaded:',
    ].concat(route).join(' '));
    app[route[0]](route[1], route[2]);
  });
};
