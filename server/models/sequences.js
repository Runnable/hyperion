/**
 * @module server/lib/sequences
 */
'use strict';

var Sequence = require('models/mongo/sequence');

var exports = module.exports;
var _sequencesSpecifications;

/**
 * Store a set of sequences in module for use by prototype methods
 */
exports.initialize = (sequencesSpecifications) => {
  _sequencesSpecifications = sequencesSpecifications;
};

/**
 * Return sequence from hash of registered sequences
 * @param {sequence} string
 * @return {Object}
 */
exports.getSequenceSpecification = (sequence) => {
  return _sequencesSpecifications[sequence];
};

/**
 * @param {Object} opts
 *   opts.name {String}
 *   opts.uuid {String}
 *   opts.meta {Object}
 * @param {Function} cb
 */
exports.createSequence = (opts, cb) => {
  var checkpoint0 = _sequencesSpecifications[opts.name].checkpoints[0];
  var sequence = new Sequence(opts);
  sequence.checkpoints.push({name: 'foo'}); //= [checkpoint0];
  sequence.save((err) => {
    //TODO: log instrument
    if (err) {
      return cb(err);
    }
    cb(null, sequence);
  });
};
