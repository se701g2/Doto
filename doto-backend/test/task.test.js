'use strict';

const mongoose = require('mongoose');
const TaskModel = require('../src/models/Task');
const UserModel = require('../src/models/User');
const assert = require('assert');

const validUser = new UserModel({
    name: 'john',
    picture: 'profile.png',
    themePreference: 'dark'
})

process.env.TEST_SUITE = 'task-test';

describe('Task Model Tests', () => {

    before(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.TEST_SUITE}`, { useNewUrlParser: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            } else {
                console.log(app.get('env'))
            }
        });
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('create & save task successfully.', async () => {
        const validTask = new TaskModel({
            user: validUser,
            taskId: '1234',
            title: 'title',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: '2020-08-14T08:50:00',
            endDate: '2020-08-14T07:50:00'
        });

        const savedTask = await validTask.save();
        assert(savedTask.taskId === '1234');
    });

    it('create task without required user & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            taskId: '1234',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: '2020-08-14T06:50:00',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.equal(error.errors['user'].message,'Path `user` is required.');
    });

    it('create task without required taskName & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            user: validUser,
            title: 'title',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: '2020-08-14T06:50:00',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.equal(error.errors['taskId'].message,'Path `taskId` is required.');
    });

    it('create task with incorrect date type & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            user: validUser,
            taskId: '1234',
            title: 'title',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: 'yesterday',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.ok(error.errors['startDate'].message);
    });

    it('create task with incorrect user type & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            user: 'john',
            taskId: '1234',
            title: 'title',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 0,
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: '2020-08-14T08:50:00',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.ok(error.errors['user'].message);
    });

    it('create task with incorrect priority number type & throws error.', async ()=>{
        const invalidTask = new TaskModel({
            user: validUser,
            taskId: '1234',
            title: 'title',
            description: 'Re-Doing all the things',
            location: 'science building',
            priority: 'High',
            duration: 120,
            reminderDate: '2020-07-14T07:50:00',
            startDate: '2020-08-14T08:50:00',
            endDate: '2020-08-14T07:50:00'
        });
    
        var error = invalidTask.validateSync();
        assert.ok(error.errors['priority'].message);
    });

    it('populating user field from user model.', async ()=>{
        TaskModel.findOne({taskName: 'Do the thing'})
            .populate('user')
            .then(
                (task) => {
                    assert(task.user.name === 'john'); 
                    done();
                }
            )
    });

    it('delete user successfully.', async ()=>{
        TaskModel.remove({taskName: 'Do the thing'})
            .then(
                (task) => {
                    assert(task === null); 
                    done();
                }
            )
    });
})