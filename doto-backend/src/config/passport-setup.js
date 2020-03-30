const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/User");
const { logger } = require("../common/logging");

// This function applies the Google strategy to passport. Used in auth-route.
passport.use(
    new GoogleStrategy(
        {
            callbackURL: "/auth/google/redirect", // User is directed here after successful login from Google login

            // Google API keys from dev account
            clientID: process.env.GOOGLE_API_CLIENT,
            clientSecret: process.env.GOOGLE_API_SECRET,

            // Callback function called after user login but before redirect
            // Gets additional info about user from Google. In this case, profile info from Google.
        },
        (accessToken, refreshToken, profile, done) => {
            const email = profile.emails[0].value;
            var user;

            // Check if user already exists in database. Creates a new database entry if they don't exist.
            User.findOne({ email }).then((currentUser) => {
                if (currentUser) {
                    logger.info("User already exists " + currentUser.email);
                    user = currentUser;
                } else {
                    user = new User({
                        email,
                        name: profile._json.name,
                        picture: profile._json.picture,
                    });

                    user.save().then((newUser) => {
                        logger.info("Created New User " + newUser.email);
                    });
                }

                // User Callback function complete, User is returned.
                done(null, user);
            });
        },
    ),
);
