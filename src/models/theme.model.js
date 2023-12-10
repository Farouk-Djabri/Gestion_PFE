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
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'declined', 'reserved'],
    default: 'pending' 
},
});

const Theme = mongoose.model('Theme', themeSchema);

module.exports = Theme;