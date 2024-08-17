const express = require('express');
const vaccineController = require('../controllers/vaccineController');
const router = express.Router();


router.get('/lala', vaccineController.index);

module.exports = router;