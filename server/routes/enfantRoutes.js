const express = require('express');
const router = express.Router();
const enfantController = require('../controllers/enfantController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);
router.get('/', enfantController.getEnfant);
router.post('/creer', enfantController.creeEnfant);
router.delete('supp/:id', enfantController.supprimeEnfant);
router.post('ajouter/:id', enfantController.ajouteCreche);
router.put('modifier/:id', enfantController.modifieEnfant);

module.exports = router;
