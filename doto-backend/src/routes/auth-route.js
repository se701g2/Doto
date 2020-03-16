const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope:['email']
}))

router.get('/google/redirect', passport.authenticate('google', {session: false},), 
function(req, res){
    //Replace with actual URL in frontend
    res.redirect("http://localhost:3001/auth/profile?name=" + req.user.name)
})

module.exports = router;