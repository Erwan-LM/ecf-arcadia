const express = require('express');
const router = express.Router();
const db = require('../db'); // Assure-toi d'importer la connexion à ta base de données

// Route pour récupérer les images par habitat
router.get('/:habitatId', (req, res) => {
    const habitatId = req.params.habitatId;

    const query = 'SELECT image_id, image_data FROM image WHERE habitat_id = ?';
    db.query(query, [habitatId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur de base de données' });
        }
        res.json(results);
    });
});

// Route pour ajouter une nouvelle image
router.post('/', (req, res) => {
    const { image_data, habitat_id } = req.body;

    if (!image_data || !habitat_id) {
        return res.status(400).json({ error: 'Données de l\'image et ID de l\'habitat requis' });
    }

    const query = 'INSERT INTO image (image_data, habitat_id) VALUES (?, ?)';
    db.query(query, [image_data, habitat_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'image' });
        }
        res.status(201).json({ message: 'Image ajoutée avec succès', image_id: results.insertId });
    });
});

// Route pour modifier une image
router.put('/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const { image_data, habitat_id } = req.body;

    const query = 'UPDATE image SET image_data = ?, habitat_id = ? WHERE image_id = ?';
    db.query(query, [image_data, habitat_id, imageId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la modification de l\'image' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Image non trouvée' });
        }
        res.json({ message: 'Image modifiée avec succès' });
    });
});

// Route pour supprimer une image
router.delete('/:imageId', (req, res) => {
    const imageId = req.params.imageId;

    const query = 'DELETE FROM image WHERE image_id = ?';
    db.query(query, [imageId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la suppression de l\'image' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Image non trouvée' });
        }
        res.json({ message: 'Image supprimée avec succès' });
    });
});

module.exports = router;
