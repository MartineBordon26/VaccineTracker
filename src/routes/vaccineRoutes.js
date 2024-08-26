const express = require('express');
const vaccineController = require('../controllers/vaccineController');
const router = express.Router();


router.get('/', vaccineController.index);

router.get('/create', vaccineController.create)
router.post('/', vaccineController.save)

router.get('/edit/:id', vaccineController.edit)
router.put('/edit/:id', vaccineController.update)

module.exports = router;