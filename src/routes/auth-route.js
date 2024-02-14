const express = require('express');

const { validateRegister } = require('../middlewares/validators/auth-validator');
const authController = require('../controller/auth-controller');

const router = express.Router();

router.post('/register', validateRegister, authController.register)

module.exports = router;