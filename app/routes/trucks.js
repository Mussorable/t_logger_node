const express = require('express');
const router = express.Router();
const trucksController = require('../controllers/trucks');

const { validateToken } = require('../middlewares/auth');

router.get('/validation', validateToken, (req, res) => {
    res.status(200).json({ message: "you are logged in" });
});
router.get('/get-all', validateToken, trucksController.getAll);
router.post('/add', validateToken, trucksController.add);

module.exports = router;