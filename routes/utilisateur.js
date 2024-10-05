const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateurController');

// Routes pour les utilisateurs
router.get('/', utilisateurController.getAllUsers);
router.get('/:username', utilisateurController.getUserByUsername);
router.post('/', utilisateurController.createUser);
router.put('/:username', utilisateurController.updateUser);
router.delete('/:username', utilisateurController.deleteUser);

module.exports = router;
