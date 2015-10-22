/**
 * @module server/io
 */
'use strict';

var socketIO = require('socket.io');

var server = require('server');

var io = module.exports = socketIO(server);

io.on('connection', function (socket) {
  console.log('connection!');
  setInterval(function () {
    socket.emit('data', Math.ceil(Math.random()*100));
  }, 1000);
  socket.on('data', function (data) {
    console.log('socketData', data);
  });
});
