const express = require('express');
const router = express.Router();

const { registerValidation, loginValidation, validate} = require('../middlewares/auth');

router.post('/register', registerValidation, validate, (req, res) => {});
router.post('/login', loginValidation, validate, (req, res) => {});
router.post('/logout', (req, res) => {});

module.exports = router;