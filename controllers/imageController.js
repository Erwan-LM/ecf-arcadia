const db = require('../db'); // Assure-toi d'importer la connexion à ta base de données

// Récupérer les images par habitat
const getImagesByHabitat = (req, res) => {
    const habitatId = req.params.habitatId;

    const query = 'SELECT image_id, image_data FROM image WHERE habitat_id = ?';
    db.query(query, [habitatId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur de base de données' });
        }
        res.json(results);
    });
};

// Ajouter une nouvelle image
const addImage = (req, res) => {
    const { image_data, habitat_id } = req.body; // Assure-toi d'envoyer image_data et habitat_id dans le corps de la requête

    if (!image_data || !habitat_id) {
        return res.status(400).json({ error: 'Données de l\'image et ID de l\'habitat requis' });
    }

    const query = 'INSERT INTO image (image_data, habitat_id) VALUES (?, ?)';
    db.query(query, [image_data, habitat_id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'image' });
        }
        res.status(201).json({ message: 'Image ajoutée avec succès', imageId: results.insertId });
    });
};

// Modifier une image
const updateImage = (req, res) => {
    const imageId = req.params.imageId;
    const { image_data, habitat_id } = req.body; // Récupérer image_data et habitat_id à modifier

    if (!image_data && !habitat_id) {
        return res.status(400).json({ error: 'Données à modifier requises' });
    }

    const query = 'UPDATE image SET image_data = ?, habitat_id = ? WHERE image_id = ?';
    db.query(query, [image_data, habitat_id, imageId], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'image' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Image non trouvée' });
        }
        res.json({ message: 'Image mise à jour avec succès' });
    });
};

// Supprimer une image
const deleteImage = (req, res) => {
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
};

// Exporter les fonctions
module.exports = {
    getImagesByHabitat,
    addImage,
    updateImage,
    deleteImage,
};
