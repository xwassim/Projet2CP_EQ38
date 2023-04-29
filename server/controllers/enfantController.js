const Enfant = require('../models/enfant');
const Creche = require('../models/creche');
const User = require('../models/user');
const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const {stringify} = require("nodemon/lib/utils");

const creeEnfant = asynchandler(async (req, res) => {
   const { nom, age } = req.body;
   const token = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id : null;
   const id = token.user._id;
   try {
       const Parent =  await new mongoose.Types.ObjectId(id);
       const enfant = await Enfant.create({
           nom,
           age,
           Parent: Parent
       });
       const user = User.findById(id);
       const enfantRef = await new mongoose.Types.ObjectId(id);
         user.Enfant.push(enfantRef);
         user.save();
       res.status(201).json({ message : 'Enfant créé', enfant });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const supprimeEnfant = asynchandler(async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id : null;
    const idUser = token.user._id;
    const enfant = await Enfant.findById(id);
    if (stringify( enfant.Parent )=== stringify( idUser)) {
        await Enfant.findByIdAndDelete(id);
        res.status(200).json({ message: 'Enfant supprimé' });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }
}
);
const getEnfant = asynchandler(async (req, res) => {
    const { id } = req.params;
    const token = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id : null;
    const idUser = token.user._id;
    const enfant = await Enfant.findById(id);
    if (stringify( enfant.Parent )=== stringify( idUser)) {
        res.status(200).json({ enfant });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }
}
);
const ajouteCreche = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { idCreche } = req.body;
    const token = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id : null;
    const idUser = token.user._id;
    const enfant = await Enfant.findById(id);
    if (stringify( enfant.Parent )=== stringify( idUser)) {
        const creche = await Creche.findById(idCreche);
        enfant.Creche.push(await new mongoose.Types.ObjectId(idCreche));
        enfant.save();
        creche.PlacesDisponibles -= 1;
        creche.save();
        res.status(200).json({ message: 'Crèche ajoutée à l\'enfant' });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }
});
const modifieEnfant = asynchandler(async (req, res) => {
    const { id } = req.params;
    const { nom, age } = req.body;
    const token = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.JWT_SECRET).id : null;
    const idUser = token.user._id;
    const enfant = await Enfant.findById(id);
    if (stringify( enfant.Parent )=== stringify( idUser)){
        enfant.nom = nom;
        enfant.age = age;
        enfant.save();
        res.status(200).json({ message: 'Enfant modifié' });
    } else {
        res.status(401).json({ message: 'Vous n\'êtes pas autorisé à supprimer cet enfant' });
    }
});

module.exports = {
    creeEnfant,
    supprimeEnfant,
    getEnfant,
    ajouteCreche,
    modifieEnfant
}