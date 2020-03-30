<<<<<<< HEAD
const jwt = require('jsonwebtoken')
=======
const jwt = require("jsonwebtoken");

>>>>>>> upstream/master
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

<<<<<<< HEAD
    if (token == null) { return res.sendStatus(runauth) }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { res.sendStatus(forbid) }    // Error if mismatch between user and token
=======
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
        } // Error if mismatch between user and token
>>>>>>> upstream/master

        req.user = user;
        next();
    });
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.authenticateToken = authenticateToken;
