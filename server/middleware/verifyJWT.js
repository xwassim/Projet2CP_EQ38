const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
        // Bearer <token>
        const token = authHeader.split(' ')[1];
        const secret = process.env.ACCESS_TOKEN_SECRET;
        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        return res.sendStatus(401).json({ message: 'Unauthorized' })
    }
}

module.exports = verifyJWT;