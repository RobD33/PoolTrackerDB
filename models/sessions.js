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
    },
    belongs_to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

module.exports = mongoose.model('sessions', SessionSchema);