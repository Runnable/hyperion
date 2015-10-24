/**
 * @module client/controllers/controllerSequences
 */
'use strict';

require('app')
  .controller('controllerSequences', controllerSequences);

function controllerSequences (
  $http,
  $routeParams,
  $scope
) {
  var data = $scope.data = {};

  $http.get('/api/sequences/'+$routeParams.sequenceName)
    .then(function success (res) {
      data.sequences = res.data;
    },
    function failure (res) {
    });
}
