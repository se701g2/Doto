const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
    id: {
        type: Schema.Types.ObjectId,
        // required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    priority: {
        type: Number
    },
    duration: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    reminderDate: {
        type: Date
    }
});

module.exports = mongoose.model('task', taskSchema);