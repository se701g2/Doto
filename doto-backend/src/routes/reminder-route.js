const express = require("express");
const router = express.Router();
const authenticateToken = require("../config/token-setup").authenticateToken;
const { subscribe } = require("../webpush/reminder-service");

router.post("/subscribe", authenticateToken, (req, res) => {
    subscribe(req.user.email, req.body);
    res.status(201).json({});
});
