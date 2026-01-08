const mongoose = require('mongoose');

const membreSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
        trim: true
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est obligatoire'],
        trim: true
    },
    adresse: {
        type: String,
        required: [true, "L'adresse est obligatoire"]
    },
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
        lowercase: true,
        trim: true
    },
    numero_membre: {
        type: String,
        required: [true, 'Le numéro de membre est obligatoire'],
        unique: true
    },
    statut: {
        type: String,
        enum: ['actif', 'suspendu'],
        default: 'actif'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Membre', membreSchema);
