const mongoose = require('mongoose');
const { Schema } = mongoose;
const MatchSchema = require('./matches')

const SessionSchema = new Schema({
    matches: {
        type:[MatchSchema],
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('sessions', SessionSchema);