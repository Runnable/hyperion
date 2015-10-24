/**
 * @module client/controllers/controllerHome
 */
'use strict';

require('../app')
  .controller('controllerHome', controllerHome);

function controllerHome (
  $scope,
  $http
) {
  console.log('controllerHome');

  $http.get('/api/sequences')
  .then(function success (response) {
    console.log('success', response);
  }, function failure (response) {
    console.log('failure', response);
  });

}
