const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { refresh } = require('../controllers/authController');



const requireAuth = asyncHandler(async (req, res, next) => {
    let token  = req.cookies.jwt;
    if (!token) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({message: 'Authorization token is required'});
        }
        refresh(req, res);
        token = req.cookies.jwt;
    }
    try {
        const decoded = await jwt.decode(token);
        //find the user by id and put it in user variable without password
        const user = await User.findById(decoded.user._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired authorization token' });
    }
});
const requireAdmin = asyncHandler(async (req, res, next) => {
    let token  = req.cookies.jwt;
    if (!token) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({message: 'Authorization token is required'});
        }
        refresh(req, res);
        token = req.cookies.jwt;
    }
    try {
        const decoded = jwt.decode(token);
        const user = await User.findById(decoded.user._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
        if (user.role !== 'admin') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        req.user = user;
        refresh(req,res);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
});
const requireProprietaire = asyncHandler(async (req, res, next) => {
    let token  = req.cookies.jwt;
    if (!token) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({message: 'Authorization token is required'});
        }
        refresh(req, res);
        token = req.cookies.jwt;
    }
    try{
        const decoded = jwt.decode(token);
        const user = await User.findById(decoded.user._id).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid authorization token' });
        }
        if (user.role !== 'proprietaire') {
            return res.status(401).json({ message: 'You are not authorized to perform this action' });
        }
        req.user = user;
        refresh(req,res);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid authorization token' });
    }
});
module.exports = { requireAdmin, requireProprietaire, requireAuth };
