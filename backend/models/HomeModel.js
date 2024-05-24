// Importer le module MySQL
const mysql = require('mysql2');

// Créer la connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Définir le modèle HabitatBiom
const HabitatBiom = {
  // Fonction pour récupérer tous les habitats biom
  getAll: (result) => {
    connection.query('SELECT * FROM habitat_biom', (err, res) => {
      if (err) {
        console.log('Error:', err);
        result(err, null);
        return;
      }
      console.log('Habitat biomes:', res);
      result(null, res);
    });
  },
  // Autres fonctions CRUD à implémenter selon les besoins
};

// Exporter le modèle HabitatBiom
module.exports = HabitatBiom;
