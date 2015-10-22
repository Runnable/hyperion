/**
 * @module server/io
 */
'use strict';

var socketIO = require('socket.io');

var log = require('lib/logger')(__filename);
var server = require('server');

var io = module.exports = socketIO(server);

io.on('connection', function (socket) {
  log.trace(socket, 'connection');
});
