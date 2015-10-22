/**
 * @module server/lib/routes/client
 */
'use strict';

var path = require('path');

var app = require('app');
var log = require('lib/logger')(__filename);

var exports = module.exports;

exports._getIndex = (req, res) => {
  res.sendFile(path.join(__dirname, '../templates/layout.html'));
};

var _routes = exports._routes = [
  ['get', '/', exports._getIndex]
];

exports.initialize = () => {
  _routes.forEach((route) => {
    log.trace([
      'Route loaded:',
    ].concat(route).join(' '));
    app[route[0]](route[1], route[2]);
  });
};
