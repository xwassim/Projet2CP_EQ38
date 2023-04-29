const express = require('express');
const router = express.Router();
const crecheController = require('../controllers/crecheController');
const { requireAuth, requireAdmin, requireProprietaire } = require('../middleware/autherization');


router.route('/create').post(crecheController.createCreche);
router.route('/delete/:id').delete(crecheController.deleteCreche);
router.route('/update/:id').patch(crecheController.updateCreche);
router.route('/').get(crecheController.consultCreche);

module.exports = router;