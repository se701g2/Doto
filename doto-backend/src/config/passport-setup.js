const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: '181904764798-mbguideg0blo89p18ibhjkknh6e2chsd.apps.googleusercontent.com',
        clientSecret: '73Tk75zlPqvruJmUAYdO1igD'
    }, (accessToken, refreshToken, profile, email, done) => { 
        var user
        //Check if user already exists in database
        User.findOne({ email: email._json.email }).then((currentUser) => {
            if (currentUser) {
                console.log('User already exists ' + currentUser.email)
                user = currentUser
            } else {
                user = new User({
                    email: email._json.email,
                })
                user.save().then((newUser) => {
                    console.log('Created New User ' + newUser.email)
                })
            }
            done(null, user)
        })
    })
)