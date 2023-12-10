const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  year: {
    type: String,
    required: true,
    enum: ['licence', 'master'],
  },
  rate: {
    type: Number,
    required: true,
  },
  approved: {
    required: true,
    type: Boolean,
    default: false, 
  },
  
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;