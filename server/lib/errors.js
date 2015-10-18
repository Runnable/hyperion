/**
 * @module server/lib/errors
 */
'use strict';

var exports = module.exports;

/**
 * @param {String} message Message to return to client
 */
exports.handleRequestError = (message) => {
  return new Error(message);
};
