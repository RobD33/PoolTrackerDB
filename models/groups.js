const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
  group_name: {
    type: String,
    required: true
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'users',
    required: true
  },
  sessions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'sessions',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  }
});

module.exports = mongoose.model('groups', GroupSchema);