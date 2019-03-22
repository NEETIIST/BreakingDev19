var jwt = require('jsonwebtoken');
const keys = require("../config/keys");

function verifyToken(req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'You need to be logged in to perform this action' });
    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });
}
module.exports = verifyToken;
