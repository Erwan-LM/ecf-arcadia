// Importer le module MySQL
const mysql = require('mysql2');

// Importer le module database.js
const database = require('../../database/database');


// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();

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
