/**
 * @module server/lib/routes/get/sequences
 */
'use strict';

var app = require('app');
var log = require('lib/logger')(__filename);
var sequences = require('models/sequences');

var exports = module.exports;

exports._getSequenceTypes = [
  (req, res, next) => {
    var spec = sequences.getSequences();
    res.send(spec);
    next();
  }
];

exports._getSequences = [
  (req, res, next) => {
    sequences.getSequenceDocuments(req.params.sequenceName, (err, sequenceDocuments) => {
      if (err) { return next(err); }
      res.send(sequenceDocuments);
      next();
    });
  }
];

var _routes = exports._routes = [
  ['get', '/sequences', exports._getSequenceTypes],
  ['get', '/sequences/:sequenceName', exports._getSequences],
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
    app[route[0]]('/api'+route[1], route[2]);
  });
};
