const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const validatePayload = require('../middlewares/validatePayload');
const { loginSchema } = require('../controllers/adminControllerSchema');

// Example route
router.post('/login', validatePayload(loginSchema), adminController.login);

module.exports = router;

