const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET User information, returns 400 error if no user found with the name
router.get('/userinfo/:name', function(req,res){
    let userinfo = User.find({"name": req.params.name}, function(err, userinfo){
        if(err){
            console.log(err);
            res.status(400).json('Error: ' + err); 
        }
        else {
            if (userinfo.length == 0){
                res.status(400).json('Error: could not find user with specified email.'); 
            }
            res.status(200).json(userinfo[0]);
        }
    }); 
})

router.get('/users', function(req,res){
    let users = User.find({}, function(err, users){
        if(err){
            console.log(err);
            res.status(400).json({msg: "failed"})
        }
        else {
            console.log(users)
            res.status(200).json(users);
        }
    })
})

module.exports = router;