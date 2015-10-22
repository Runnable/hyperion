/**
 * @module client/controllers/controllerHome
 */
'use strict';

require('../app')
  .controller('controllerHome', controllerHome);

function controllerHome (
  $scope
) {
  console.log('controllerHome');
}
