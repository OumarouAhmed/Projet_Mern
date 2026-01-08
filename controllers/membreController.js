const Membre = require('../models/Membre');


const createMembre = async (req, res) => {
    try {
        const nouveauMembre = new Membre(req.body);
        const membreSauvegarde = await nouveauMembre.save();
        res.status(201).json(membreSauvegarde);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la création du membre", error: err.message });
    }
};


const getAllMembres = async (req, res) => {
    try {
        const membres = await Membre.find();
        res.status(200).json(membres);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération des membres", error: err.message });
    }
};


const getMembreById = async (req, res) => {
    try {
        const membre = await Membre.findById(req.params.id);
        if (!membre) {
            return res.status(404).json({ message: "Membre non trouvé" });
        }
        res.status(200).json(membre);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la récupération du membre", error: err.message });
    }
};


const updateMembre = async (req, res) => {
    try {
        const membre = await Membre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!membre) {
            return res.status(404).json({ message: "Membre non trouvé" });
        }
        res.status(200).json(membre);
    } catch (err) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du membre", error: err.message });
    }
};


const deleteMembre = async (req, res) => {
    try {
        const membre = await Membre.findByIdAndDelete(req.params.id);
        if (!membre) {
            return res.status(404).json({ message: "Membre non trouvé" });
        }
        res.status(200).json({ message: "Membre supprimé avec succès" });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression du membre", error: err.message });
    }
};

module.exports = {
    createMembre,
    getAllMembres,
    getMembreById,
    updateMembre,
    deleteMembre
};
