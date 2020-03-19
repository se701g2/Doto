const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_API_CLIENT,
        clientSecret: process.env.GOOGLE_API_SECRET
    }, (accessToken, refreshToken, profile, done) => { 
        const email = profile.emails[0].value
        var user
        //Check if user already exists in database
        User.findOne({ email }).then((currentUser) => {
            if (currentUser) {
                console.log('User already exists ' + currentUser.email)
                user = currentUser
            } else {
                user = new User({
                    email,
                    name: profile._json.name,
                    picture: profile._json.picture
                })
                user.save().then((newUser) => {
                    console.log('Created New User ' + newUser.email)
                })
            }
            done(null, user)
        })
    })
)