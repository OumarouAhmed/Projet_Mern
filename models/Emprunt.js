const mongoose = require('mongoose');

const empruntSchema = new mongoose.Schema({
    livre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livre',
        required: [true, 'Le livre est obligatoire']
    },
    membre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membre',
        required: [true, 'Le membre est obligatoire']
    },
    date_emprunt: {
        type: Date,
        default: Date.now
    },
    date_retour_prevue: {
        type: Date,
        required: true
    },
    date_retour_reelle: {
        type: Date,
        default: null
    },
    statut: {
        type: String,
        enum: ['en_cours', 'termine', 'en_retard'],
        default: 'en_cours'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Emprunt', empruntSchema);
