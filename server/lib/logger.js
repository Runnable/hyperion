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

module.exports = bunyan.createLogger({
  name: 'hyperion',
  streams: streams,
  serializers: serializers
});
