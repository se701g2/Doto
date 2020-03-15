const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userschema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    picture:{
        type: String
    },
    themePreference: {
        type: String
    }
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userschema);