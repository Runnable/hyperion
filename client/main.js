/**
 * @module client/main
 */
'use strict';

require('./app');
require('angular');

/**
 * Each 'index' generated via grunt process dynamically includes all browserify common-js modules
 * in js bundle
 */
require('./controllers/index');
require('./services/index');

var io = require('./lib/socket.io');
var socket = io.connect('http://localhost:3000');
socket.on('data', function (data) {
  console.log('data received', data);
});

//require('router');

/**
 * Bundle of all templates to be attached to $templateCache generated by grunt process
 */
//var views = require('./build/views/viewBundle');

/**
 * DOM-ready event, start app
 */
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
