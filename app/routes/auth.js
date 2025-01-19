const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const { registerValidation, loginValidation, validate} = require('../middlewares/auth');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.post('/logout', (req, res) => {});

module.exports = router;