/**
 * @module client/services/socket
 */
'use strict';

var io = require('./lib/socket.io');
var socket = io.connect('http://localhost:3000');

require('app')
  .factory('socket', socketFactory);

function socketFactory () {
  return socket;
}
