const mysql = require('mysql');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

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
    // Logique pour modifier les services du zoo
    try {
        // Exemple de logique pour la modification des services
        const { serviceId, nouveauNom } = req.body;

        const query = 'UPDATE Services SET nom = ? WHERE id = ?';
        connection.query(query, [nouveauNom, serviceId], (error, results) => {
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
    // Logique pour donner de la nourriture aux animaux
    try {
        // Exemple de logique pour donner de la nourriture aux animaux
        const { animalId, date, heure, nourriture, quantite } = req.body;

        const query = 'INSERT INTO Nourriture (animal_id, date, heure, nourriture, quantite) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [animalId, date, heure, nourriture, quantite], (error, results) => {
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
