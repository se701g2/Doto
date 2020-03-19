const express = require('express');
const router = express.Router();
const passport = require('passport');
const url = process.env.FRONTEND_URL || 'http://localhost:3000';

router.get('/google', passport.authenticate('google', {
    scope:['email']
}))

router.get('/google/redirect', passport.authenticate('google', {session: false},), 
function(req, res){
    const email = req.user.email
    const buffer = new Buffer(email)
    const encode = buffer.toString('base64')
    //Replace with actual URL in frontend
    res.redirect(url + '/calendar?=' + encode);
})

module.exports = router;