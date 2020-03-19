const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/token-setup').authenticateToken
const Task = require('../models/Task');

//GET ALL task
router.get('/get', authenticateToken, (req,res) => {
    let tasks = Task.find({"user": req.user.email})
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(400).json('Error: ' + err));
});

//ADD task 
router.post('/post', authenticateToken, function(req, res){
    let task = new Task();
    task.user = req.user.email;
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
            res.status(400).json({taskId: req.params.taskId, Successful: "False"});
        } else {
            res.status(200).json({taskId: req.params.taskId, Successful: "True"})
        }
    });
});

//UPDATE task
router.put('/:taskId', function(req, res){
    Task.updateOne({taskId: req.params.taskId}, req.body, {new: true}, function(err, updatedTask){
        console.log(updatedTask);
        if(err || !updatedTask){
            console.log(err);
            res.status(400).json({taskId: req.params.taskId, Successful: "False"});
        } else {
            res.status(200).json({taskId: req.params.taskId, Successful: "True"})
        }
    });
});

//DELETE task
router.delete('/:taskId', authenticateToken, function(req, res){
    const task = Task.findOne({ taskId: req.params.taskId }, function(err) {
        if(err) { res.sendStatus(400) }
    })
    console.log('task ' + task.user)
    console.log('return ' + req.user.email)
    if (task.user != req.user.email) return res.sendStatus(403)
 
    Task.remove({"taskId": req.params.taskId}, function(err){
        if(err){
            console.log(err);
            res.status(400).json({taskId: req.params.taskId, Deleted: "False"});
        } else {
            res.status(200).json({taskId: req.params.taskId, Deleted: "True"});
        }
    });
});

module.exports = router;
