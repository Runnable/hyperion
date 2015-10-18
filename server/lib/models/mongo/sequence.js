/**
 * @module server/lib/models/mongo/sequence
 */
'use strict';

var mongoose = require('mongoose');

var sequenceSchema = mongoose.Schema({
  name: String,
  meta: Object,
  uuid: {
    type: String,
    index: {
      unique: true
    }
  },
  checkpoints: [Object]
});

module.exports = mongoose.model('Sequence', sequenceSchema);
