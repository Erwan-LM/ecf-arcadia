const mysql = require('mysql2');

class Services {
    static async getAllServices() {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
        });

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

