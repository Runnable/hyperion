/**
 * Example initialization of Hyperion
 *
 * NODE_PATH=./server/lib node ./example.js
 * @module example/example
 */
'use strict';

var Hyperion = require('../index');

var hyperion = new Hyperion({
  port: 3000,
  db: 'mongodb://localhost/hyperion',
  sequences: {
    'build-system': {
      checkpoints: [{
        name: 'worker1-start',
        intervalSeconds: 30
      }, {
        name: 'worker1-complete',
        intervalSeconds: 5
      }, {
        name: 'microservice1-message-received',
        intervalSeconds: 60
      }, {
        name: 'microservice1-completed'
      }]
    },
    'deploy-system': {
      checkpoints: [{
        name: 'worker1a-start',
        intervalSeconds: 30
      }, {
        name: 'worker1a-finish'
      }]
    }
  }
});

hyperion.start();

