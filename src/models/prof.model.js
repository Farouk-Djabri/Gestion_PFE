const mongoose = require('mongoose');

const profSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['normal', 'chef'],
    default: 'normal',
  },
  approved: {
    type: Boolean,
    default: false, 
  },
  });

const Prof = mongoose.model('Prof', profSchema);

module.exports = Prof;
