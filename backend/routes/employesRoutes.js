const express = require('express');
const router = express.Router();
const employesController = require('../controllers/employesController');

// Routes pour les employés
router.post('/avis/:id', employesController.validerAvis);
router.put('/services', employesController.modifierServices);
router.post('/nourriture', employesController.donnerNourriture);

module.exports = router;
