const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateursController');

// Routes pour l'enregistrement et la connexion des utilisateurs
router.post('/register', utilisateursController.register);
router.post('/login', utilisateursController.login);

module.exports = router;
