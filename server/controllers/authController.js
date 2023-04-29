const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const sendEmail = require('../config/sendEmail');
const validator = require('validator');


const createToken = (res,user) => {
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    const payload = { user : userWithoutPassword};
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const expiresIn = process.env.ACCESS_EXPIRES_IN;
    const token =  jwt.sign(payload, secret , { expiresIn });
    res.cookie('jwt', token, { httpOnly: true , maxAge: 15 * 60 * 1000});
};
const createRefreshToken = (res,user) => {
    const payload = { id: user._id };
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const expiresIn = process.env.REFRESH_EXPIRES_IN;
    const token =  jwt.sign(payload, secret , { expiresIn });
    res.cookie('refreshToken', token, { httpOnly: true , maxAge: 7 * 24 * 60 * 60 * 1000});
}

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) {
        res.status(400).json({ message: 'Please fill all fields' });
    }

    const user = await User.findOne({ email });
    try{
        const match = await bcrypt.compare(password, user.password);
         if(match){
            const userWithoutPassword = user.toObject();
            delete userWithoutPassword.password;
            createToken(res,user);
            createRefreshToken(res,user);
            res.status(201).json({message: " user logged in  successfully " ,user : userWithoutPassword });
        }
        else {
            res.status(400).json({ message: 'Invalid password' });
        }
    }
    catch (error) {
        res.status(400).json({ message: 'Invalid email' });
    }
});

const signup = asyncHandler(async (req, res) => {
    const { name , email, password, role } = req.body;
    // validation
    if (!email || !password || !name ) {
        res.status(400).json({ message: 'Please fill all fields' });
    }
    if (!validator.isEmail(email)) {
        res.status(400).json({ message: 'Please enter a valid email' });
    }
    if (!validator.isStrongPassword(password)) {
        res.status(400).json({ message: 'Please enter a strong password' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(409).json({ message: 'Email already exists' });
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({ message: " user created successfully " ,user : userWithoutPassword });
    }
});

const logout = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
});

const refresh = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
        createToken(res,user);
        createRefreshToken(res,user);
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;

    await User.findOne({email}, async (err, user) => {
        if (err || !user) {
            res.status(404).json({message: 'User not found'});
        } else {
            let  resetToken = crypto.randomBytes(32).toString('hex');
            resetToken = await bcrypt.hash(resetToken + user._id, 10);
            await sendEmail.constructor(user.email, user.passwordResetToken , resetToken).sendPasswordReset();
            const resetExpiresIn = new Date(Date.now() + process.env.PASSWORD_RESET_EXPIRES_IN * 1000);
            await user.updateOne({passwordResetToken:resetToken, passwordResetExpires:resetExpiresIn});
            res.status(200).json({message: 'Password reset email sent'});
        }
    });
});

const resetPassword = asyncHandler(async (req, res) => {
    // 1) Get user based on the token
    const {resetToken} = req.params;
    const user = await User.findOne({passwordResetToken:resetToken});
    //check if token has expired
    if (!user || user.passwordResetExpires > Date.now()) {
        res.status(400).json({ message: 'Token is invalid or has expired' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await user.updateOne({password:hashedPassword, passwordResetToken:undefined, passwordResetExpires:undefined});
    // 4) Log the user in, send JWT
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    createToken(res,user);
    createRefreshToken(res,user);
    res.status(201).json({message: " password reset successfully " ,user : userWithoutPassword });
});
const changePassword = asyncHandler(async (req, res) => {
    let accessToken = req.cookies.jwt;
    if (!accessToken) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({message: ' token is required'});
        }
        refresh(req, res);
        accessToken = req.cookies.jwt;
    }
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword ) {
        res.status(400).json({ message: 'Please fill all fields' });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.user._id);
    try {
        if (!user || !bcrypt.compare(oldPassword, user.password)) {
            res.status(401).json({ message: 'Invalid password ' });
        }
        if (!validator.isStrongPassword(newPassword)) {
            res.status(400).json({ message: 'Please enter a strong password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.updateOne({password:hashedPassword});
        //update the token
        createToken(res,user);
        createRefreshToken(res,user);
        res.status(200).json({message: 'Password changed successfully'});
    }
    catch (err) {
        res.status(401).json({ message: 'Invalid or expired refresh token' });
    }
});


module.exports = {
    login,
    signup,
    logout,
    refresh,
    forgotPassword,
    resetPassword,
    changePassword
}

