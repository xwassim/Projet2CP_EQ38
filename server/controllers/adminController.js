// the admin can get all the users and all the avis 
// and he can delete a user or an avis
const User = require('../models/user')
const Avis = require('../models/Avis')
const Enfant = require('../models/enfant')
const Creche = require('../models/creche')

const asyncHandler = require('express-async-handler')
const mongoose = require("mongoose");

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.json(users)
}
)

// @desc    Get all avis
// @route   GET /api/admin/avis
// @access  Private/Admin
const getAvis = asyncHandler(async (req, res) => {
    const avis = await Avis.find({})
    res.json(avis)
}
)

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.deleteOne();
        await Avis.deleteMany({ IdUser: req.params.id })
        await Enfant.deleteMany({ Parent: req.params.id })
        await Creche.deleteMany({ Proprietaire: req.params.id })
        res.json({ message: 'User removed' })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
}
)

// @desc    Delete an avis
// @route   DELETE /api/admin/avis/:id
// @access  Private/Admin
const deleteAvis = asyncHandler(async (req, res) => {
    const avis = await Avis.findById(req.params.id)
    if (avis) {
        await avis.remove()
        res.json({ message: 'Avis removed' })
    }
    else {
        res.status(404)
        throw new Error('Avis not found')
    }
}
)
const getCreches = asyncHandler(async (req, res) => {
    const creches = await Creche.find({})
    res.json(creches)
}
)
const deleteCreche = asyncHandler(async (req, res) => {
    const creche = await Creche.findById(req.params.id)
    if (creche) {
        await creche.deleteOne();
        const user = await User.find({ _id: creche.Proprietaire })
        user.liste_creches.pull(creche);
        await user.save();
        res.json({ message: 'Creche removed' })
    }
    else {
        res.status(404)
        throw new Error('Creche not found')
    }
}
)


module.exports = { getUsers, getAvis, deleteUser, deleteAvis }