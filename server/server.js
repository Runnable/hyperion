/**
 * Entry point of hyperion server
 * @module server/server
 */
'use strict';

var express = require('express');

var log = require('logger')(__filename);
var routes = require('routes/routes');
var sequences = require('models/sequences');

var app = express();
var exports = module.exports = app;

exports._expressListenCallback = (port, err) => {
  if (err) {
    return log.error({
      err: err
    }, '_expressListenCallback error');
  }
  log.trace('_expressListenCallback success PORT: '+
            port);
};

/**
 * Initialize application.
 *   - Initialize sequences
 *   - Bind routes
 *   - Start express server
 */
exports.start = (opts) => {
  sequences.initialize(opts.sequences);
  routes.initialize(app);
  exports.listen(opts.port, exports._expressListenCallback.bind(this, opts.port));
};
