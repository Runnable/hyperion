/**
 * @module server/lib/sequences
 */
'use strict';

var exports = module.exports;

var _sequencesSpecifications;

/**
 * Store a set of sequences in module for use by prototype methods
 */
exports.initialize = (_sequencesSpecifications) => {
  _sequencesSpecifications = _sequencesSpecifications;
};

/**
 * Return sequence from hash of registered sequences
 * @param {sequence} string
 * @return {Object}
 */
exports.getSequenceSpecification = (sequence) => {
  return _sequencesSpecifications[sequence];
};
