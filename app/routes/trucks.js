const express = require('express');
const router = express.Router();
const trucksController = require('../controllers/trucks');

const { validateToken } = require('../middlewares/auth');

router.get('/validation', validateToken, (req, res) => {
    res.status(200).json({ message: "you are logged in", status: 'success' });
});

router.get('/get-all', validateToken, trucksController.getAll);
router.post('/add', validateToken, trucksController.add);
router.delete('/:id', validateToken, trucksController.delete);

router.post('/:id/add-legend', validateToken, trucksController.addLegend);
router.put('/:id/legends/:legendId', validateToken, trucksController.updateLegend);

router.get('/:id/records', validateToken, trucksController.getTruckRecords);
router.post('/:id/add-record', validateToken, trucksController.addRecord);
router.put('/:id/records/:noteId', validateToken, trucksController.makeRecordDone);

module.exports = router;