const express = require('express');
const router = express.Router();
const {
    createEmprunt,
    retourEmprunt,
    getEmpruntsEnRetard,
    getHistoriqueMembre,
    getAllEmprunts
} = require('../controllers/empruntController');

router.post('/', createEmprunt);
router.put('/:id/retour', retourEmprunt);
router.get('/retards', getEmpruntsEnRetard);
router.get('/membre/:idMembre', getHistoriqueMembre);
router.get('/', getAllEmprunts);

module.exports = router;
