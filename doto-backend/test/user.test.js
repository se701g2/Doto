'use strict';

const mongoose = require('mongoose');
const UserModel = require('../src/models/User');
const assert = require('assert');

process.env.TEST_SUITE = 'user-test';

describe('User Model Test', () => {

    before(async () => {
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.TEST_SUITE}`, { useNewUrlParser: true}, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    after(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('create  user and save  successfully.', async () => {
        const validUser = new UserModel({
            email:'john',
            picture: 'profile.png',
            themePreference: 'dark'
        });
        const savedUser = await validUser.save();
        assert(savedUser.email === 'john')
    });

    it('gets user information', async () => {
        let userinfo = await UserModel.find({"email": 'john'})
        assert(userinfo[0].email === 'john')
    });

    it('create user with same name & throws error.', async () => {
        const invalidUser = new UserModel({
            email:'john',
            picture: 'profile.png',
            themePreference: 'light'
        });

        await invalidUser.save(function (err) {
                assert(err.name == 'ValidationError');
            });
    });

    it('create  user without required name field & throws error.', async () => {
        const invalidUser = new UserModel({
            picture: 'profile.png',
            themePreference: 'dark'
        });

        var error = invalidUser.validateSync();
        assert.equal(error.errors['email'].message,'Path `email` is required.');
    });

    it('delete user successfully.', async () => {
        UserModel.remove({user: 'john'})
            .then(
                (task) => {
                    assert(user === null); 
                    done();
                }
            )
    });

})