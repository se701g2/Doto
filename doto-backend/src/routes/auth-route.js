const express = require('express');
const router = express.Router();
const passport = require('passport');
const generateAccessToken = require('../config/token-setup').generateAccessToken;
const url = process.env.FRONTEND_URL || 'http://localhost:3000';

router.get('/google', passport.authenticate('google', {
    scope:[
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}))

router.get('/google/redirect', passport.authenticate('google', {session: false},), 
function(req, res){
    const user = { email: req.user.email }
    const email = req.user.email
    const buffer = new Buffer(email)
    const encode = buffer.toString('base64')

    const accessToken = generateAccessToken(user)
    //Replace with actual URL in frontend
    res.redirect(url + '/calendar?email=' + encode + '&accessToken=' + accessToken);
})

module.exports = router;