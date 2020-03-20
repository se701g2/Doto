const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

// Schema for Task objects (which are associated with a User)
// REQUIRED PROPERTIES: user, taskId, duration, startDate, endDate
// Refer to https://github.com/se701g2/Doto/wiki/Database-Schema for details
const taskSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
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

taskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('task', taskSchema);