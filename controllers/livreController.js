const Livre = require('../models/Livre');


const createLivre = async (req, res) => {
    try {
        const nouveauLivre = new Livre(req.body);
        const livreSauvegarde = await nouveauLivre.save();
        res.status(201).json(livreSauvegarde);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création du livre", error: err.message });
    }
};


const getAllLivres = async (req, res) => {
    try {
        const livres = await Livre.find();
        res.status(200).json(livres);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des livres", error: err.message });
    }
};


const getLivreById = async (req, res) => {
    try {
        const livre = await Livre.findById(req.params.id);
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        res.status(200).json(livre);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération du livre", error: err.message });
    }
};


const updateLivre = async (req, res) => {
    try {
        const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        res.status(200).json(livre);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du livre", error: err.message });
    }
};


const deleteLivre = async (req, res) => {
    try {
        const livre = await Livre.findByIdAndDelete(req.params.id);
        if (!livre) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }
        res.status(200).json({ message: "Livre supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du livre", error: err.message });
    }
};

module.exports = {
    createLivre,
    getAllLivres,
    getLivreById,
    updateLivre,
    deleteLivre
};
