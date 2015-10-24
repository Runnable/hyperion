/**
 * @module client/controllers/controllerHome
 */
'use strict';

require('app')
  .controller('controllerHome', controllerHome);

function controllerHome (
  $http,
  $scope,
  socket
) {
  var data = $scope.data = {};

  socket.on('postSequence', function (data) {
    console.log('postSequence: ', data);
  });

  $http.get('/api/sequences')
  .then(function success (res) {
    data.sequenceTypes = res.data;
  }, function failure (res) {
  });
}
