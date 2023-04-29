const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth, requireAdmin, requireProprietaire } = require('../middleware/autherization');


router.route('/signup').post(authController.signup);
router.route('/').post(authController.login);
//redirect to login page if user is not logged in
router.route('/logout').get(requireAuth,authController.logout);
router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/changePassword').patch(requireAuth,authController.changePassword);
module.exports = router;
