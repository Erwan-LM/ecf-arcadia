// backend/routes/animauxRoutes.js
const express = require('express');
const router = express.Router();
const Animaux = require('../models/Animaux');

router.get('/', (req, res) => {
    Animaux.getAll((err, results) => {
        if (err) {
            return res.status(500).send('Error retrieving animals from database');
        }
        res.json(results);
    });
});

module.exports = router;
