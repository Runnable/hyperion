/**
 * @module server/server
 */
'use strict';

var http = require('http');

var app = require('app');

module.exports = http.Server(app);
