// middleware/auth.js
const jwt = require('jsonwebtoken');
const Login = require('../models/Login.model');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret_key');
        const user = await Login.findOne({ _id: decoded._id, loginKey: decoded.loginKey });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token.' });
    }
};

module.exports = auth;
