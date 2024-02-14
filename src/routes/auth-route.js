const express = require('express');

const { validateRegister, validateLogin } = require('../middlewares/validators/auth-validator');
const authController = require('../controller/auth-controller');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login)
router.get('/me', authenticate, authController.me);

module.exports = router;