const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');

router.get('/habitats', HomeController.getAllHabitatBiomes);

module.exports = router;
