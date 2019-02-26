const express = require('express');
const router = express.Router();
// Import user controller
const userController = require("../controllers/user.controllers");
const middle = require('../authentication/authentication')
// Contact routes
router.post('/login', userController.login);
router.post('/register', userController.registration);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetpassword/:token', middle.checkToken, userController.setPassword);
// Export API routes
module.exports = router;