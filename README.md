HYPERION
========

Distributed system checkpoint monitor service.  

Design a sequence of `checkpoints` and alert if a step the sequence is not reached within a 
defined timeframe. 

```js
var Hyperion = require('hyperion');
hyperion = new Hyperion({
  port: 3000,
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
        ...
      }]
    }
  }
});
```

### POST /sequences/
```js
// Request body
{
  "name": "build-system",
  "meta": {},
  "uuid": "" // key for checkpoint association
}
```

### POST /sequences/checkpoint
```js
{
  "uuid": "001",
  "name": "worker1-complete"
}
```
