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
            res.json({taskId: req.params.taskId, Successful: "False"});
        } else {
            res.json({taskId: req.params.taskId, Successful: "True"})
        }
    });
});

//UPDATE task (WIP - Not currently usable)
router.put('/schedule/:taskId', function(req, res){

    let task = new Task();
    task.user = req.body.user;
    task.taskId = req.params.taskId;
    task.title = req.body.title;
    task.description = req.body.description;
    task.location = req.body.location;
    task.priority = req.body.priority;
    task.duration = req.body.duration;
    task.startDate = req.body.startDate;
    task.endDate = req.body.endDate;
    task.reminderDate = req.body.reminderDate;

    task.updateOne({"taskId":req.params.taskId},function(err){
        if(err){
            console.log(err);
            res.json({taskId: req.params.taskId, Successful: "False"});
        } else {
            res.json({taskId: req.params.taskId, Successful: "True"})
        }
    });
});

//DELETE task
router.delete('/schedule/:taskId', function(req, res){
    Task.remove({"taskId": req.params.taskId}, function(err){
        if(err){
            console.log(err);
            res.json({taskId: req.params.taskId, Deleted: "False"});
        } else {
            res.json({taskId: req.params.taskId, Deleted: "True"});
        }
    });
});

module.exports = router;