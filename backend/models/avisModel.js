const mysql = require('mysql2');

// Importer le module database.js
const database = require('../../database/database');


// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = connection;
