const express = require('express');
const router = express.Router();
const habitatController = require('../controllers/habitatController');

// Route pour obtenir les habitats
router.get('/', habitatController.getHabitats);

// Route pour obtenir un habitat spécifique
router.get('/:id', habitatController.getHabitatById);

module.exports = router;
