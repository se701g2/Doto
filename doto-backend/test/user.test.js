'use strict';

const mongoose = require('mongoose');
const UserModel = require('../src/models/User');
const assert = require('assert');

process.env.TEST_SUITE = 'user-test';

describe('User Model Test', () => {

    beforeEach(async () => {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.TEST_SUITE}`, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
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

    it('create & save user successfully.', async () => {
        const validUser = new UserModel(userData);
        const savedUser = await validUser.save();
        
        assert(savedUser.name === userData.name)
    });

})

const userData = {
    name: 'Lucy',
    email: 'lucy@email.com',
    password: '12345'
};