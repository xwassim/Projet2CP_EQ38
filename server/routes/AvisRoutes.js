const express = require('express');
const router = express.Router();
const avisController = require('../controllers/AvisController');


router.route('/Avis').post(avisController.GiveAvis)



module.exports = router;