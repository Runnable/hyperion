/**
 * Primary API endpoint route handlers
 * @module server/lib/routes/routes
 */
'use strict';

var hasKeypaths = require('101/has-keypaths');
var pick = require('101/pick');

var errors = require('errors');
var log = require('logger')(__filename);
var sequences = require('models/sequences');

var exports = module.exports;

/**
 * 
 */
exports._postSequencesInitialValidation = (req, res, next) => {
  if(!hasKeypaths(req.body, ['name', 'uuid'])) {
    return next(errors.handleRequestError('invalid request'));
  }
  var s = sequences.getSequenceSpecification(req.body.name);
  if (!s) {
    return next(errors.handleRequestError('unknown sequence'));
  }
  next();
};

/**
 *
 */
exports._createNewSequence = (req, res, next) => {
  var opts = pick(req.body, ['name', 'uuid', 'meta']);
  sequences.createSequence(opts, function (err, sequence) {
    if (err) {
      return next(err);
    }
    req.runnableData.sequence = sequence;
    next();
  });
};

/**
 * POST /sequences
 */
exports._postSequences = [
    /**
     * 1. Is valid sequence?
     * 2. Persist sequence (w/ automatically created first checkpoint)
     * 3. Initialize alert countdown
     */
  exports._postSequencesInitialValidation,
  exports._createNewSequence,
  (req, res, next) => {
    res.send(201);
  }
];

/**
 * POST /sequences/checkpoint
 */
exports._postSequencesCheckpoint = [
];

/**
 * GET /sequences
 */
exports._getSequences = [];

/**
 * GET /sequences/:id
 */
exports._getSequence = [];

var _routes = exports._routes = [
  ['post', '/sequences', exports._postSequences],
  ['post', '/sequences/checkpoint', exports._postSequencesCheckpoint],
//  ['get', '/sequences', exports._getSequences],
//  ['get', '/sequences/:id', exports._getSequence]
];

/**
 * Bind route middlewares to request paths
 * @param {Object} app instance of express
 */
exports.initialize = (app) => {
  _routes.forEach((route) => {
    log.trace([
      'Route loaded:',
    ].concat(route).join(' '));
    app[route[0]](route[1], route[2]);
  });
};
