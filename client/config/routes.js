/**
 * @module client/config/routes
 */
'use strict';

module.exports = [{
  url: '^/',
  templateUrl: 'viewIndex',
  controller: 'controllerIndex'
}, {
  url: '^/:sequenceName',
  templateUrl: 'viewSequences',
  controller: 'controllerSequences'
}, {
  url: '^/:sequenceName/:sequenceUuid',
  templateUrl: 'viewSequence',
  controller: 'controllerSequence'
}];

Object.freeze(module.exports);
