const express = require('express');
const router = express.Router();
const passport = require('passport');
const url = process.env.FRONTEND_URL || 'http://localhost:3001';

router.get('/google', passport.authenticate('google', {
    scope:['email']
}))

router.get('/google/redirect', passport.authenticate('google', {session: false},), 
function(req, res){
    //Replace with actual URL in frontend
    res.redirect(url + '/calendar')
})

module.exports = router;