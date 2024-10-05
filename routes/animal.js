const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// Route pour obtenir les animaux par habitat
router.get('/habitat/:habitatId', animalController.getAnimalsByHabitat);

module.exports = router;
