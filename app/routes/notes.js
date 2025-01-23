const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notes');

const { validateToken } = require('../middlewares/auth.js');

router.get('/get-all', validateToken, notesController.getAll);
router.post('/add', validateToken, notesController.add);
router.put('/:id', validateToken, notesController.update);
router.delete('/:id', validateToken, notesController.delete);

module.exports = router;