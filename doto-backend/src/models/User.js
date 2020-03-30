const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

// Schema for User objects
// Refer to https://github.com/se701g2/Doto/wiki/Database-Schema for details
const userschema = mongoose.Schema({
    email: {
        // Email (obtained from Google's OAuth 2) is used as ID
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    picture: {
        type: String,
    },
    themePreference: {
        type: String,
        default: "dark",
    },
    startTime: {
        type: Date,
        default: "2020-03-15T09:00:00",
    },
    endTime: {
        type: Date,
        default: "2020-03-15T17:00:00",
    },
<<<<<<< HEAD
>>>>>>> 75b491a... issue/210 - Extend formatting toolchain to work with both projects (#217)
=======
>>>>>>> eb5e13e... Forgot to change variable names in DotoServices and fixed conflict issue in User.js
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userschema);
