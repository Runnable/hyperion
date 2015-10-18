/**
 * Instantiates and exports custom configured instance of bunyan for JSON formatted logging
 * throughout application
 * @module server/lib/logger
 */
'use strict';
require('loadenv')();

var bunyan = require('bunyan');
var put = require('101/put');

var streams = [{
  level: process.env.LOG_LEVEL_STDOUT,
  stream: process.stdout
}];

var serializers = put(bunyan.stdSerializers, {
  /* custom serializers will go here */
});

var logger = bunyan.createLogger({
  name: 'hyperion',
  streams: streams,
  serializers: serializers
});

/**
 * https://github.com/trentm/node-bunyan#logchild
 * Initialize and return instance of a bunyan child logger
 * @param {String} module
 * @return {Object} instance of bunyan child logger
 */
function createChildLogger (module) {
  return logger.child({
    module: module
  });
}

module.exports = createChildLogger;
