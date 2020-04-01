const express = require("express");
const router = express.Router();
const authenticateToken = require("../config/token-setup").authenticateToken;
const User = require("../models/User");
const { logger } = require("../common/logging");
const response = require("../constants/http-response");
// GET User information
router.get("/get", authenticateToken, function (req, res) {
    const email = req.user.email;
    User.find({ email: email }, function (err, userinfo) {
        if (err) {
            logger.error(err);
            res.status(response.BADREQUEST).json("Error: " + err);
        } else {
            if (userinfo.length === 0) {
                res.status(response.BADREQUEST).json("Error: could not find user with specified email.");
            }
            res.status(response.SUCCESSFUL).json(userinfo[0]);
        }
    });
});

// UPDATE User information
router.put("/update", authenticateToken, function (req, res) {
    const email = req.user.email;
    User.updateOne({ email: email }, req.body, { new: true }, function (err, updatedUser) {
        logger.info(updatedUser);
        if (err || !updatedUser) {
            logger.error(err);
            res.status(response.BADREQUEST).json({ email: email, Successful: "False" });
        } else {
            res.status(response.SUCCESSFUL).json({ email: email, Successful: "True" });
        }
    });
});

// GET ALL Users in the system
router.get("/email", function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            logger.error(err);
            res.status(response.BADREQUEST).json({ msg: "failed" });
        } else {
            logger.info(users);
            res.status(response.SUCCESSFUL).json(users);
        }
    });
});

module.exports = router;
