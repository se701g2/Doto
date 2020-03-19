const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Schema for User objects
const userschema = mongoose.Schema({
    email: {            // Email (obtained from Google's OAuth 2) is used as ID
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
    },
    picture: {
        type: String
    },
    themePreference: {
        type: String,
        default: 'dark'
    }
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userschema);