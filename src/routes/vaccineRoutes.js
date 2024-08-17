const express = require('express');
const vaccineController = require('../controllers/vaccineController');
const router = express.Router();


router.get('/', vaccineController.index);

router.get('/create', vaccineController.create)
router.post('/', vaccineController.save)

module.exports = router;