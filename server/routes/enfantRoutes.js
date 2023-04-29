const express = require('express');
const router = express.Router();
const enfantController = require('../controllers/enfantController');
const {requireAuth} = require('../middleware/autherization');

router.get('/', requireAuth, enfantController.getEnfant);
router.post('/creer', requireAuth, enfantController.creeEnfant);
router.delete('supp/:id', requireAuth, enfantController.supprimeEnfant);
router.post('ajouter/:id', requireAuth, enfantController.ajouteCreche);
router.put('modifier/:id', requireAuth, enfantController.modifieEnfant);

module.exports = router;
