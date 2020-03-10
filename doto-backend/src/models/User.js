const mongoose = require('mongoose');

// basic data schema
const userschema = mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email:{
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('user', userschema);