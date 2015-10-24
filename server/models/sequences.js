/**
 * @module server/lib/sequences
 */
'use strict';

var put = require('101/put');

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
 * Return sequence types and specifications
 * @return {Object}
 */
exports.getSequences = () => {
  // return copy
  return put({}, _sequencesSpecifications);
};

/**
 * Return sequence from hash of registered sequences
 * @param {String} sequenceName string
 * @return {Object}
 */
exports.getSequenceSpecification = (sequenceName) => {
  return _sequencesSpecifications[sequenceName];
};

/**
 *
 */
exports.getSequenceDocuments = (sequenceName, cb) => {
  Sequence.find({name: sequenceName}, cb);
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
  sequence.checkpoints = [checkpoint0];
  sequence.save((err) => {
    //TODO: log instrument
    if (err) {
      return cb(err);
    }
    cb(null, sequence);
  });
};
