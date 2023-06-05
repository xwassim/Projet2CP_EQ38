const express = require('express');
const router = express.Router();
const reauirePropriateRole = require('../middleware/autherization');
const verifyJWT = require("../middleware/verifyJWT");
const adminController = require('../controllers/adminController');
router.use(verifyJWT);
router.use(reauirePropriateRole(['admin']));


router.get('/users', adminController.getUsers);
router.get('/avis', adminController.getAvis);
router.delete('/users/:id', adminController.deleteUser);
router.delete('/avis/:id', adminController.deleteAvis);




module.exports = router;
