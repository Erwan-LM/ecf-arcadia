// models/Animaux.js
const mysql = require('mysql2');

// Importer le module database.js
const database = require('../../database/database');


// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();

const Animaux = {};

Animaux.getAll = (callback) => {
    connection.query('SELECT * FROM Animaux', (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = Animaux;
