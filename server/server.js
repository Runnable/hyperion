/**
 * Entry point of hyperion server
 * @module server/server
 */
'use strict';

var express = require('express');

var log = require('logger')(__filename);

var app = express();
var exports = module.exports = app;

exports._expressListenCallback = (err) => {
  if (err) {
    return log.error({
      err: err
    }, '_expressListenCallback error');
  }
  log.trace('_expressListenCallback success PORT: '+process.env.PORT);
};



exports.listen(process.env.PORT, exports._expressListenCallback);
