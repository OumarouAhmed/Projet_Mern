const express = require('express');
const router = express.Router();
const {
    createLivre,
    getAllLivres,
    getLivreById,
    updateLivre,
    deleteLivre
} = require('../controllers/livreController');

router.post('/', createLivre);
router.get('/', getAllLivres);
router.get('/:id', getLivreById);
router.put('/:id', updateLivre);
router.delete('/:id', deleteLivre);

module.exports = router;
