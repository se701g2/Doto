const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    taskId: {
        type: String,
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