/**
 * Entry point of hyperion server
 * @module server/server
 */
'use strict';

var express = require('express');
var app = module.exports = express();

var log = require('logger')(__filename);

var exports = module.exports;

exports._expressListenCallback = (err) => {
  if (err) {
    return log.error({
      err: err
    }, '_expressListenCallback error');
  }
  log.trace('_expressListenCallback success PORT: '+process.env.PORT);
};

app.listen(process.env.PORT, exports._expressListenCallback);
