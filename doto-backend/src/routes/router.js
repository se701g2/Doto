const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET ALL users
router.get('/users', function(req, res){
    let users = User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.json({msg: "failed"})
        }
        else {
            console.log(users)
            res.json(users);
        }
    })
})

// ADD user
router.post('/users/add', function (req, res) {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "failed..."})
        }
        else{
            res.json(user)
        }
    });
});

module.exports = router;