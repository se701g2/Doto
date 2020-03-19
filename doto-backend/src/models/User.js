const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const userschema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String, 
    }, 
    picture:{
        type: String
    },
    themePreference: {
        type: String,
        default: 'dark'
    }
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userschema);