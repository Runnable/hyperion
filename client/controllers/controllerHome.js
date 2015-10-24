/**
 * @module client/controllers/controllerHome
 */
'use strict';

require('../app')
  .controller('controllerHome', controllerHome);

function controllerHome (
  $http,
  $scope,
  socket
) {

  console.log('controllerHome');

  socket.on('postSequence', function (data) {
    console.log('postSequence: ', data);
  });

  $http.get('/api/sequences')
  .then(function success (response) {
    console.log('success', response);
  }, function failure (response) {
    console.log('failure', response);
  });

}
