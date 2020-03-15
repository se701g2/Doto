const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET ALL users
router.get('/users', function(req, res){
    User.find({})
    .then(users => {
        console.log(users)
        res.status(200).json(users)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
})

// ADD user
router.post('/users/add', function (req, res) {

    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save()
    .then(() => {
        console.log(user)
        res.status(200).json(user)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;