/**
 * @module client/router
 */
'use strict';

var app = require('app');
var routes = require('config/routes');

app.config([
  '$routeProvider',
  //'$locationProvider'
function (
  $routeProvider
  //$locationProvider
) {
  routes.forEach(function (route) {
    $routeProvider.when(route.url, {
      templateUrl: route.templateUrl,
      controller: route.controller
    });
  });
}]);
