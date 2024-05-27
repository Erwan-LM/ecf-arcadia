const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Route pour créer un contact
router.post('/', contactController.createContact);

module.exports = router;
