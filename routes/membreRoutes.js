const express = require('express');
const router = express.Router();
const {
    createMembre,
    getAllMembres,
    getMembreById,
    updateMembre,
    deleteMembre
} = require('../controllers/membreController');

router.post('/', createMembre);
router.get('/', getAllMembres);
router.get('/:id', getMembreById);
router.put('/:id', updateMembre);
router.delete('/:id', deleteMembre);

module.exports = router;
