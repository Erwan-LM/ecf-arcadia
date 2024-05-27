const mysql = require('mysql2');

// Exportez une fonction pour créer une connexion à la base de données
function createConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
}

// Exportez la fonction pour permettre son utilisation dans d'autres fichiers
module.exports = {
  createConnection
};
