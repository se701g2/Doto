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
});

userschema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userschema);
