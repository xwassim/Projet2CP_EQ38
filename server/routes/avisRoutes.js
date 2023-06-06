const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisController');
const verifyjwt =require('../middleware/verifyJWT');
router.use(verifyjwt);

router.route('/Avis').post(verifyjwt,avisController.GiveAvis)
router.route('/Avis').get(verifyjwt,avisController.getAvis)
router.route('/Avis/:id').get(verifyjwt,avisController.getAvisCreche)

router.route('/Avis/:id').delete(verifyjwt,avisController.deelete)




module.exports = router;