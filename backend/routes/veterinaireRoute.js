const express = require('express');
const router = express.Router();
const veterinaireController = require('../controllers/veterinaireController');

// Routes pour les comptes rendus
router.get('/compterendus', veterinaireController.getAllComptesRendus);
router.get('/compterendus/:id', veterinaireController.getCompteRendu);
router.post('/compterendus', veterinaireController.createCompteRendu);
router.put('/compterendus/:id', veterinaireController.updateCompteRendu);
router.delete('/compterendus/:id', veterinaireController.deleteCompteRendu);

// Routes pour les habitats
router.get('/habitats', veterinaireController.getAllHabitats);
router.get('/habitats/:id', veterinaireController.getHabitatDetail);
router.post('/habitats', veterinaireController.createHabitat);
router.put('/habitats/:id', veterinaireController.updateHabitat);
router.delete('/habitats/:id', veterinaireController.deleteHabitat);

module.exports = router;
