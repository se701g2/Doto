'use strict';

const mongoose = require('mongoose');
const TaskModel = require('../src/models/Task');
const assert = require('assert');

process.env.TEST_SUITE = 'task-test';

describe('Task Model Tests', () => {

    beforeEach(async () => {
        await mongoose.connect(`mongodb://localhost:27017/user-test`, { useNewUrlParser: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterEach(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save task successfully.', async () => {
        const validTask = new TaskModel({
            user: 'elmo',
            taskName: 'Do the thing',
            description: 'Doing all the things',
            location: 'engineering building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-04-14T07:50:00',
            endDate: '2020-04-14T08:00:00'
        });

        const savedTask = await validTask.save();
        assert(savedTask.taskName === 'Do the thing');
    });

    it('create task without required fields & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            user: 'elmo',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.equal(error.errors['taskName'].message,'Path `taskName` is required.');
    });
})