/**
 * @module server/lib/sequences
 */
'use strict';

var find = require('101/find');
var isFunction = require('101/is-function');
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
  return put({}, _sequencesSpecifications[sequenceName]);
};

/**
 *
 */
exports.getSequenceDocuments = (sequenceName, sequenceUuid, cb) => {
  var query = {
    name: sequenceName
  };
  if (isFunction(sequenceUuid)) {
    cb = sequenceUuid;
    Sequence.find(query).sort({date: -1}).exec(cb);
  } else {
    query.uuid = sequenceUuid;
    Sequence.findOne(query, cb);
  }
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
  opts.date = new Date();
  checkpoint0.date = new Date();
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

/**
 *
 */
exports.createSequenceCheckpoint = (opts, cb) => {
  Sequence.findOne({
    uuid: opts.uuid
  }, (err, sequence) => {
    if (err) { return cb(err); }
    if (!sequence) { return cb(new Error('Sequence not found')); }
    var sequenceSpec = exports.getSequenceSpecification(sequence.name);
    var checkpointSpec = find(sequenceSpec.checkpoints, (checkpoint) => {
      return checkpoint.name === opts.name;
    });
    if (!checkpointSpec) {
      return cb(new Error('Invalid checkpoint name'));
    }
    var alreadyExists = find(sequence.checkpoints, (checkpoint) => {
      return checkpoint.name === opts.name;
    });
    if (alreadyExists) {
      return cb(new Error('Checkpoint already exists'));
    }
    checkpointSpec.date = new Date();
    sequence.checkpoints.push(checkpointSpec);
    sequence.save(cb);
  });
};
