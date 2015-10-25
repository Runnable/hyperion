/**
 * @module client/controllers/controllerSequence
 */
'use strict';

// TODO move to service
var find = require('101/find');

require('app')
  .controller('controllerSequence', controllerSequence);

function controllerSequence (
  $http,
  $routeParams,
  $scope,
  socket
) {
  var data = $scope.sequenceData = {};

  data.sequenceName = $routeParams.sequenceName;
  data.sequenceUUid = $routeParams.sequenceUuid;

  socket.on('postSequence', function (data) {
    if (data.uuid === $routeParams.sequenceUuid) {
      fetchSequence();
    }
  });

  /**
   * Test if spec checkpoint is in list of reached checkpoints
   * @return {Boolean}
   */
  data.checkpointComplete = function (checkpointName) {
    if (!data.sequence) { return false; }
    return find(data.sequence.checkpoints, function (checkpoint) {
      return checkpoint.name === checkpointName;
    });
  };

  $http.get('/api/sequences')
    .then(function success (res) {
      data.sequencesSpecifications = res.data;
      data.sequenceSpec = res.data[$routeParams.sequenceName];
    },
    function failure (res) {
    });

  function fetchSequence () {
    $http.get('/api/sequences/'+$routeParams.sequenceName+'/'+$routeParams.sequenceUuid)
      .then(function success (res) {
        data.sequence = res.data;
      },
      function failure (res) {
      });
  }
  fetchSequence();
}
