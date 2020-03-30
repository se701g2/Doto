const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const authenticateToken = require('../config/token-setup').authenticateToken
const User = require('../models/User');
=======
const authenticateToken = require("../config/token-setup").authenticateToken;
const User = require("../models/User");
const { logger } = require("../common/logging");

>>>>>>> upstream/master
// GET User information
router.get("/get", authenticateToken, function (req, res) {
    const email = req.user.email;
    User.find({ email: email }, function (err, userinfo) {
        if (err) {
<<<<<<< HEAD
            console.log(err);
            res.status(badReq).json('Error: ' + err);
        }
        else {
            if (userinfo.length == 0) {
                res.status(badReq).json('Error: could not find user with specified email.');
=======
            logger.error(err);
            res.status(400).json("Error: " + err);
        } else {
            if (userinfo.length === 0) {
                res.status(400).json("Error: could not find user with specified email.");
>>>>>>> upstream/master
            }
            res.status(200).json(userinfo[0]);
        }
    });
});

// UPDATE User information
router.put("/update", authenticateToken, function (req, res) {
    const email = req.user.email;
    User.updateOne({ email: email }, req.body, { new: true }, function (err, updatedUser) {
        logger.info(updatedUser);
        if (err || !updatedUser) {
<<<<<<< HEAD
            console.log(err);
            res.status(badReq).json({ email: email, Successful: "False" });
=======
            logger.error(err);
            res.status(400).json({ email: email, Successful: "False" });
>>>>>>> upstream/master
        } else {
            res.status(200).json({ email: email, Successful: "True" });
        }
    });
});

// GET ALL Users in the system
router.get("/email", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
<<<<<<< HEAD
            console.log(err);
            res.status(badReq).json({ msg: "failed" })
        }
        else {
            console.log(users)
=======
            logger.error(err);
            res.status(400).json({ msg: "failed" });
        } else {
            logger.info(users);
>>>>>>> upstream/master
            res.status(200).json(users);
        }
    });
});

module.exports = router;
