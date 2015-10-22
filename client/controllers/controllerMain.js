/**
 * @module client/controllers/controllerMain
 */
'use strict';

require('../app')
  .controller('controllerMain', controllerMain);

function controllerMain (
  $scope
) {
  console.log('controllerMain');
}
