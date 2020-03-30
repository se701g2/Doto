const jwt = require("jsonwebtoken");
const response = require("../Constants/http-response.js");
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.sendStatus(response.unauth);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(response.forbid);
        } // Error if mismatch between user and token

        req.user = user;
        next();
    });
}

module.exports.generateAccessToken = generateAccessToken;
module.exports.authenticateToken = authenticateToken;
