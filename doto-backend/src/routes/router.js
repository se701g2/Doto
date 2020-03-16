const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Task = require('../models/Task');


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

/*
// GET ALL users
router.route('/users').get((req, res) => {
    let users = User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});
*/
// ADD user
router.post('/users/add', function (req, res) {

    let user = new User();
    user.name = req.body.name;
    user.picture = req.body.picture;
    user.themePreference = req.body.themePreference;

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

/*
// ADD user
router.route('/users/add').post((req, res) => {

    let user = new User();
    user.name = req.body.name;
    user.picture = req.body.picture;
    user.themePreference = req.body.themePreference;

    user.save()
        .then(() => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
});
*/


//GET ALL task
router.route('/schedule/get/:user').get((req,res) => {
    let tasks = Task.find({"user": req.params.user})
    .then(tasks => res.json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

//ADD task 
router.post('/schedule/post', function(req, res){

    let task = new Task();
    task.user = req.body.user;
    task.taskId = req.body.taskId;
    task.title = req.body.title;
    task.description = req.body.description;
    task.location = req.body.location;
    task.priority = req.body.priority;
    task.duration = req.body.duration;
    task.startDate = req.body.startDate;
    task.endDate = req.body.endDate;
    task.reminderDate = req.body.reminderDate;

    task.save(function(err){
        if(err){
            console.log(err);
            res.json({msg: "error adding task..."});
        } else {
            res.json(task)
        }
    });
});

//DELETE task
router.delete('/schedule/:taskId', function(req, res){
    Task.remove({"taskId": req.params.taskId}, function(err){
        if(err){
            console.log(err);
            res.json({msg: "error deleting task..."});
        } else {
            res.json({msg: "delete successful"});
        }
    });
});

module.exports = router;