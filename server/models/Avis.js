const mongoose = require('mongoose');

const AvisSchema = new mongoose.Schema({
    commentaire: [
        {
            type: String,
        }
    ],
    IdUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    DateCreation: {
        type: Date,
        default: Date.now
    },
    NoteEvaluation : {
        type: Number,
        required: true,
        default: 0
    }
});

const Avis = mongoose.model('Avis', AvisSchema);