/**
 * @module server/lib/models/alerts
 */
'use strict';

var findIndex = require('101/find-index');
var keypather = require('keypather')();

var sequences = require('models/sequences');

var exports = module.exports;

var _alerts = exports._alerts = {};

/**
 * @param {String} alertKey
 */
exports._cancelAlert = (alertKey) => {
};

/**
 *
 */
exports._getAlertKey = (sequenceName, sequenceUuid, checkpointName) => {
  return sequenceName + '|' + sequenceUuid + '|' + checkpointName;
};

/**
 * @param {String} sequenceName
 * @param {String} sequenceUuid
 * @param {String} checkpointName
 */
exports.createAlert = (sequenceName, sequenceUuid, checkpointName) => {
  /**
   * 1. Remove alert for prior checkpoint if exists
   * 2. Initiate timeout alert for current checkpoint
   */
  var sequenceSpec = sequences.getSequenceSpecification(sequenceName);
  var checkpointIndex = findIndex(sequenceSpec.checkpoints, (checkpoint) => {
    return checkpoint.name === checkpointName;
  });
  if (checkpointIndex > 0) {
    let cancelCheckpoint = sequenceSpec.checkpoints[checkpointIndex-1];
    exports._cancelAlert(cancelCheckpoint);
  }
};
