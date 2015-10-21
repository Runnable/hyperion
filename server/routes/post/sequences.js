/**
 * @module server/lib/routes/post/sequences
 */
'use strict';

var hasKeypaths = require('101/has-keypaths');
var last = require('101/last');
var pick = require('101/pick');

var alerts = require('models/alerts');
var errors = require('lib/errors');
var log = require('lib/logger')(__filename);
var sequences = require('models/sequences');

var exports = module.exports;

/**
 * Validate POST request body.
 * 1. Assert body contains keypaths:
 *  - name
 *  - uuid
 * 2. Assert `name` is a registered sequence
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
 * Persist sequence document to database collection
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
 *
 */
exports._initializeCheckpointAlert = (req, res, next) => {
  var s = req.runnableData.sequence;
  alerts.createAlert(s.name, s.uuid, last(s.checkpoints).name);
  next();
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
  exports._initializeAlertCountdown,
  (req, res) => {
    res.send(201);
  },
  (err, req, res, next) => {
    if (err.code === 11000) {
      res.status(409).send();
      return next();
    }
    res.status(500).send();
    next();
  }
];

/**
 * POST /sequences/checkpoint
 */
exports._postSequencesCheckpoint = [
];

var _routes = exports._routes = [
  //['post', '/sequences', exports._postSequences],
  //['post', '/sequences/checkpoint', exports._postSequencesCheckpoint]
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
