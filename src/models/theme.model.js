const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true
 },
  description: { 
    type: String, 
    required: true 
},
  proposer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
},
  proposerRole: { 
    type: String, 
    enum: ['prof', 'student', 'admin'], 
    required: true 
},
  category: {
    type: String,
    enum: ['normal', 'startup'],
    default: 'normal'
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'declined'],
    default: 'pending' 
},
reservations: [
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student', 
    },
    reservationDate: {
      type: Date,
      default: Date.now,
    }
  },
],
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;