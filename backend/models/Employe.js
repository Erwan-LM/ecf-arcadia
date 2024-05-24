const connection = require('../config/mysql2');


class Employe {
    constructor(email) {
        this.email = email;
    }

    static async getAllEmployes() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT email FROM Utilisateurs WHERE type = "Employé"';
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                const employes = results.map(result => result.email);
                resolve(employes);
            });
        });
    }

    static async getEmployeByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Utilisateurs WHERE email = ? AND type = "Employé"';
            connection.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.length === 0) {
                    resolve(null);
                    return;
                }
                const employeData = results[0];
                const employe = new Employe(employeData.email);
                resolve(employe);
            });
        });
    }
}

module.exports = Employe;
