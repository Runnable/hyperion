/**
 * @module client/main
 */
'use strict';

var app = require('./app');
require('angular');

/**
 * Each 'index' generated via grunt process dynamically includes all browserify common-js modules
 * in js bundle
 */
require('./controllers/index');
require('./services/index');
require('./router');

var io = require('./lib/socket.io');
var socket = io.connect('http://localhost:3000');

socket.on('postSequence', function (data) {
  console.log('postSequence: ', data);
});


/**
 * Bundle of all templates to be attached to $templateCache generated by grunt process
 */
var views = require('./build/views/viewBundle');

/**
 * Pre-load template cache with compiled jade templates included in JS bundle
 */
app.run(['$rootScope',
  '$templateCache',
  function (
    $rootScope,
    $templateCache) {
    Object.keys(views.Templates).forEach(function (viewName) {
      $templateCache.put(viewName, views.Templates[viewName]());
    });
  }
]);

/**
 * DOM-ready event, start app
 */
angular.element(document).ready(function () {
  angular.bootstrap(document, ['app']);
});
