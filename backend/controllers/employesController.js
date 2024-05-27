// Importer le module database.js
const database = require('../../database/database');


// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

exports.validerAvis = async (req, res) => {
    try {
        const { id } = req.params;
        const { est_valide } = req.body;

        const query = 'UPDATE Avis SET est_valide = ? WHERE id = ?';
        connection.query(query, [est_valide, id], (error, results) => {
            if (error) {
                console.error('Erreur lors de la validation de l\'avis :', error);
                res.status(500).json({ message: 'Erreur lors de la validation de l\'avis' });
                return;
            }
            res.status(200).json({ message: 'Avis validé avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors de la validation de l\'avis :', error);
        res.status(500).json({ message: 'Erreur lors de la validation de l\'avis' });
    }
};

exports.modifierServices = async (req, res) => {
    try {
        const { serviceId, nouveauNom, nouvelleDescription } = req.body;

        // Logique pour mettre à jour les services
        const query = 'UPDATE services SET nom = ?, description = ? WHERE id = ?';
        connection.query(query, [nouveauNom, nouvelleDescription, serviceId], (error, results) => {
            if (error) {
                console.error('Erreur lors de la modification des services :', error);
                res.status(500).json({ message: 'Erreur lors de la modification des services' });
                return;
            }
            res.status(200).json({ message: 'Service modifié avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors de la modification des services :', error);
        res.status(500).json({ message: 'Erreur lors de la modification des services' });
    }
};


exports.donnerNourriture = async (req, res) => {
    try {
        const { animalId, date, nourriture, quantite } = req.body;

        // Logique pour enregistrer la donnée de nourriture
        const query = 'INSERT INTO Nourriture (animal_id, date, nourriture, quantite) VALUES (?, ?, ?, ?)';
        connection.query(query, [animalId, date, nourriture, quantite], (error, results) => {
            if (error) {
                console.error('Erreur lors de la donnée de nourriture aux animaux :', error);
                res.status(500).json({ message: 'Erreur lors de la donnée de nourriture aux animaux' });
                return;
            }
            res.status(201).json({ message: 'Nourriture donnée avec succès' });
        });
    } catch (error) {
        console.error('Erreur lors de la donnée de nourriture aux animaux :', error);
        res.status(500).json({ message: 'Erreur lors de la donnée de nourriture aux animaux' });
    }
};
