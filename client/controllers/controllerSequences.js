/**
 * @module client/controllers/controllerSequences
 */
'use strict';

require('app')
  .controller('controllerSequences', controllerSequences);

function controllerSequences (
  $http,
  $routeParams,
  $scope,
  socket
) {
  var data = $scope.data = {};

  data.sequenceName = $routeParams.sequenceName;

  socket.on('postSequence', function () {
    fetchSequences();
  });

  $http.get('/api/sequences')
    .then(function success (res) {
      data.sequencesSpecifications = res.data;
      data.specCheckpoints = res.data[$routeParams.sequenceName].checkpoints;
    },
    function failure (res) {
    });

  function fetchSequences () {
    $http.get('/api/sequences/'+$routeParams.sequenceName)
      .then(function success (res) {
        data.sequences = res.data;
      },
      function failure (res) {
      });
  }

  fetchSequences();
}
