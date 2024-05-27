const mysql = require('mysql2');
const database = require('../../database/database');


class Services {
    static async getAllServices() {

// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();

        return new Promise((resolve, reject) => {
            connection.connect();
            const query = 'SELECT * FROM services';
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(results);
            });
            connection.end();
        });
    }
}

module.exports = Services;

