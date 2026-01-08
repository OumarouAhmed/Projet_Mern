const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: [true, 'Le titre est obligatoire'],
        trim: true
    },
    auteur: {
        type: String,
        required: [true, "L'auteur est obligatoire"],
        trim: true
    },
    ISBN: {
        type: String,
        required: [true, "L'ISBN est obligatoire"],
        unique: true,
        trim: true
    },
    nombre_copies_total: {
        type: Number,
        required: [true, 'Le nombre de copies total est obligatoire'],
        min: [0, 'Le nombre de copies ne peut pas être négatif']
    },
    nombre_copies_disponibles: {
        type: Number,
        required: [true, 'Le nombre de copies disponibles est obligatoire'],
        min: [0, 'Le nombre de copies disponibles ne peut pas être négatif']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Livre', livreSchema);
