const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateAccessToken = require('../config/token-setup').generateAccessToken;
const url = process.env.FRONTEND_URL || 'http://localhost:3000';

// This function is called when user is redirected upon login (uses passport-setup)
router.get('/google', passport.authenticate('google', {
    // Data accessible
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}))

router.get('/google/redirect',              // Destination of redirect
    passport.authenticate('google', { session: false }),
    function (req, res) {
        const user = { email: req.user.email }
        const email = req.user.email        // Request sent from done() function in passport-setup
        const buffer = new Buffer(email)
        const encode = buffer.toString('base64')

        const accessToken = generateAccessToken(user)

        // Once authorisation is done, the user is redirected to a frontend page.
        // Email and accessToken are parameters in the URL because redirect doesn't support sending responses
        res.redirect(url + '/calendar?email=' + encode + '&accessToken=' + accessToken);
    })

module.exports = router;