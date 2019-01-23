const mongoose = require('mongoose');
const { Schema } = mongoose;

const MatchSchema = new Schema({
    player1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    player2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    eightball: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = MatchSchema