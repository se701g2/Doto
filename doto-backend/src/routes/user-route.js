const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/token-setup').authenticateToken
const User = require('../models/User');

// GET User information, returns 400 error if no user found with the name
router.get('/get', authenticateToken, function (req, res) {
    const email = req.user.email
    User.find({ "email": email }, function (err, userinfo) {
        if (err) {
            console.log(err);
            res.status(400).json('Error: ' + err);
        }
        else {
            if (userinfo.length == 0) {
                res.status(400).json('Error: could not find user with specified email.');
            }
            res.status(200).json(userinfo[0]);
        }
    });
})

// UPDATE USER INFORMATION
router.put('/update', authenticateToken, function (req, res) {
    const email = req.user.email
    User.updateOne({ email: email }, req.body, { new: true }, function (err, updatedUser) {
        console.log(updatedUser);
        if (err || !updatedUser) {
            console.log(err);
            res.status(400).json({ email: email, Successful: "False" });
        } else {
            res.status(200).json({ email: email, Successful: "True" })
        }
    });
})

//GET ALL USERS IN THE SYSTEMS
router.get('/email', function (req, res) {
    let users = User.find({}, function (err, users) {
        if (err) {
            console.log(err);
            res.status(400).json({ msg: "failed" })
        }
        else {
            console.log(users)
            res.status(200).json(users);
        }
    })
})

module.exports = router;