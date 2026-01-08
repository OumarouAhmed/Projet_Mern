const Emprunt = require('../models/Emprunt');
const Livre = require('../models/Livre');

// Créer un emprunt
const createEmprunt = async (req, res) => {
    try {
        const { livre, membre } = req.body;

        // 1. Vérifier la disponibilité du livre
        const livreConcerne = await Livre.findById(livre);
        if (!livreConcerne) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        if (livreConcerne.nombre_copies_disponibles <= 0) {
            return res.status(400).json({ message: "Livre non disponible pour le moment" });
        }

        // 2. Calculer la date de retour prévue (+14 jours)
        const dateEmprunt = new Date();
        const dateRetourPrevue = new Date(dateEmprunt);
        dateRetourPrevue.setDate(dateRetourPrevue.getDate() + 14);

        // 3. Créer l'emprunt
        const nouvelEmprunt = new Emprunt({
            livre,
            membre,
            date_emprunt: dateEmprunt,
            date_retour_prevue: dateRetourPrevue
        });
        const empruntSauvegarde = await nouvelEmprunt.save();

        // 4. Mettre à jour le stock du livre (-1)
        livreConcerne.nombre_copies_disponibles -= 1;
        await livreConcerne.save();

        res.status(201).json(empruntSauvegarde);

    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création de l'emprunt", error: err.message });
    }
};

// Retourner un emprunt
const retourEmprunt = async (req, res) => {
    try {
        const emprunt = await Emprunt.findById(req.params.id);
        if (!emprunt) {
            return res.status(404).json({ message: "Emprunt non trouvé" });
        }
        if (emprunt.statut === 'termine') {
            return res.status(400).json({ message: "Cet emprunt est déjà terminé" });
        }

        // 1. Mettre à jour l'emprunt
        emprunt.date_retour_reelle = Date.now();
        emprunt.statut = 'termine';
        await emprunt.save();

        // 2. Mettre à jour le stock du livre (+1)
        const livre = await Livre.findById(emprunt.livre);
        if (livre) {
            livre.nombre_copies_disponibles += 1;
            await livre.save();
        }

        res.status(200).json({ message: "Livre retourné avec succès", emprunt });

    } catch (err) {
        res.status(500).json({ message: "Erreur lors du retour de l'emprunt", error: err.message });
    }
};

// Lister les emprunts en retard
const getEmpruntsEnRetard = async (req, res) => {
    try {
        const dateActuelle = new Date();
        const retards = await Emprunt.find({
            statut: 'en_cours',
            date_retour_prevue: { $lt: dateActuelle }
        }).populate('livre').populate('membre');

        res.status(200).json(retards);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des retards", error: err.message });
    }
};

// Historique des emprunts d'un membre
const getHistoriqueMembre = async (req, res) => {
    try {
        const emprunts = await Emprunt.find({ membre: req.params.idMembre })
            .populate('livre')
            .sort({ date_emprunt: -1 }); // Plus récents en premier

        res.status(200).json(emprunts);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération de l'historique", error: err.message });
    }
};

// Lister tous les emprunts
const getAllEmprunts = async (req, res) => {
    try {
        const emprunts = await Emprunt.find().populate('livre').populate('membre');
        res.status(200).json(emprunts);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des emprunts", error: err.message });
    }
};

module.exports = {
    createEmprunt,
    retourEmprunt,
    getEmpruntsEnRetard,
    getHistoriqueMembre,
    getAllEmprunts
};
