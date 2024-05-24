const express = require('express');
const router = express.Router();
const administrateursController = require('../controllers/administrateursController');

// Routes pour les administrateurs
router.post('/creer-compte', administrateursController.creerCompte);
router.put('/modifier-services', administrateursController.modifierServices);
router.put('/modifier-habitat', administrateursController.modifierHabitat);
router.put('/modifier-animaux', administrateursController.modifierAnimaux);
router.get('/comptes-rendus', administrateursController.listeComptesRendus);
router.get('/filtrer-comptes-rendus', administrateursController.filtrerComptesRendus);

module.exports = router;
