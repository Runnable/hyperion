/**
 * @module server/lib/messenger
 */
'use strict';

var io = require('io');

var exports = module.exports;

/**
 * @param {String} name
 * @param {String} uuid
 */
exports.emitPostSequences = (name, uuid) => {
  io.emit('postSequence', {
    name: name,
    uuid: uuid
  });
};
