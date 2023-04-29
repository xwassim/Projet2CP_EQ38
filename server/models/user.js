const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Please provide a name.'],
    }, email: {
        type: String,
        required: [true, 'Please provide an email.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email.',],
    }, password: {
        type: String,
        required: [true, 'Please provide a password.'],
    }, role: {
        type: String, type: String, enum: ['parent', 'proprietaire', 'admin'], default: 'parent'
    }, Enfant: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Enfant'
    }], Creche: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Creche'
    }],
    passwordResetToken: String,
    passwordResetExpires: Date,
});

module.exports = User = mongoose.model('user', userSchema)
