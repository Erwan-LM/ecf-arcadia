const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisController');

router.post('/avis', avisController.createAvis);
router.get('/avis', avisController.getValidAvis);
router.put('/avis/:id', avisController.updateAvisStatus);

module.exports = router;
