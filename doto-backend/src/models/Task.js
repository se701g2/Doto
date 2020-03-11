const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    priority: {
        type: Number
    },
    duration: {
        type: Number
    },
    reminderDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
});

module.exports = mongoose.model('task', taskSchema);