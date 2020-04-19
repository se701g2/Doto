const express = require("express");
const router = express.Router();
const authenticateToken = require("../config/token-setup").authenticateToken;
const reminderService = require("../webpush/reminder-service");

router.post("/subscribe", authenticateToken, (req, res) => {
    reminderService.subscribe(req.user.email, req.body);
    res.status(201).json({});
});

module.exports = router;
