/**
 * @module client/config/routes
 */
'use strict';

module.exports = [{
  url: '/',
  templateUrl: 'viewHome',
  controller: 'controllerHome'
}, {
  url: '/:sequenceName',
  templateUrl: 'viewSequences',
  controller: 'controllerSequences'
}, {
  url: '/:sequenceName/:sequenceUuid',
  templateUrl: 'viewSequence',
  controller: 'controllerSequence'
}];

Object.freeze(module.exports);
