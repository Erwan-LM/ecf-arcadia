// models/Animaux.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
  });

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
