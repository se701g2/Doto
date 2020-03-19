const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_API_CLIENT,
        clientSecret: process.env.GOOGLE_API_SECRET
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