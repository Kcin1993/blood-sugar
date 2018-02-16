/*
 * Create an orderModal
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Records = new Schema({
  date: {
    type: String,
    required: false
  },
  time_1: {
    type: String,
    required: false
  },
  time_2: {
    type: String,
    required: false
  },
  time_3: {
    type: String,
    required: false
  },
  time_4: {
    type: String,
    required: false
  },
  time_2_content: {
    type: String,
    required: false
  },
  bs_1: {
    type: String,
    required: false
  },
  bs_2: {
    type: String,
    required: false
  },
  bs_3: {
    type: String,
    required: false
  },
  insulin_1: {
    type: String,
    required: false
  },
  insulin_2: {
    type: String,
    required: false
  },
  insulin_3: {
    type: String,
    required: false
  },
  adj_insulin_1: {
    type: String,
    required: false
  },
  adj_insulin_2: {
    type: String,
    required: false
  },
  adj_insulin_3: {
    type: String,
    required: false
  },
  low_bs: {
    type: Boolean,
    required: false
  },
  note: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Records', Records);
