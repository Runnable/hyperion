/**
 * Entry point of hyperion server
 * @module server/server
 */
'use strict';

var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

var clientRoutes = require('routes/client');
var log = require('lib/logger')(__filename);
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
 */
exports._initializeMongoose = (connectionUrl) => {
  //new Promise()
  mongoose.connect(connectionUrl); //TODO: Add logic to block until connection completes
};

/**
 *
 */
exports._initializeMiddleware = (app) => {
  app.use(bodyParser.json());
  app.use('/build', express.static(path.join(__dirname, '../client/build/')));
  app.use((req, res, next) => {
    // initialize middleware shared data namespace
    req.runnableData = {};
    next();
  });
};

/**
 * Initialize application.
 *   - Initialize sequences
 *   - Bind routes
 *   - Start express server
 */
exports.start = (opts) => {
  //new Promise()
  sequences.initialize(opts.sequences);
  exports._initializeMongoose(opts.db);
  exports._initializeMiddleware(app);
  routes.initialize(app);
  clientRoutes.initialize(app);
  exports.listen(opts.port, exports._expressListenCallback.bind(this, opts.port));
};
