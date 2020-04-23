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
        default: new Date(new Date().setHours(9, 0, 0, 0)),
    },
    endTime: {
        type: Date,
        default: new Date(new Date().setHours(19, 0, 0, 0)),
    },
    points: {
        type: Number,
        default: 0,
    },
    unlockedItems: [
        {
            type: String,
        },
    ],
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userschema);
