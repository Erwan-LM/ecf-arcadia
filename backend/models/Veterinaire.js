const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const Veterinaire = {};

// Methodes pour gérer les comptes rendus
Veterinaire.getAllComptesRendus = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM comptes_rendus', (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

Veterinaire.getCompteRendu = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM comptes_rendus WHERE id = ?', [id], (error, results) => {
      if (error) reject(error);
      resolve(results[0]);
    });
  });
};

Veterinaire.ajouterCompteRendu = (id_utilisateur, id_animal, date, rapport) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO comptes_rendus (id_utilisateur, id_animal, date, rapport) VALUES (?, ?, ?, ?)';
    connection.query(query, [id_utilisateur, id_animal, date, rapport], (error, results) => {
      if (error) reject(error);
      resolve({ id: results.insertId, id_utilisateur, id_animal, date, rapport });
    });
  });
};

Veterinaire.updateCompteRendu = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE comptes_rendus SET ? WHERE id = ?';
    connection.query(query, [updatedData, id], (error, results) => {
      if (error) reject(error);
      resolve(results.affectedRows > 0 ? updatedData : null);
    });
  });
};

Veterinaire.deleteCompteRendu = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM comptes_rendus WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) reject(error);
      resolve(results.affectedRows > 0);
    });
  });
};

// Methodes pour gérer les habitats
Veterinaire.getAllHabitats = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM habitats', (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

Veterinaire.getHabitatDetail = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM habitats WHERE id = ?', [id], (error, results) => {
      if (error) reject(error);
      resolve(results[0]);
    });
  });
};

Veterinaire.createHabitat = (nom, images, description) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO habitats (nom, images, description) VALUES (?, ?, ?)';
    connection.query(query, [nom, images, description], (error, results) => {
      if (error) reject(error);
      resolve({ id: results.insertId, nom, images, description });
    });
  });
};

Veterinaire.updateHabitat = (id, updatedData) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE habitats SET ? WHERE id = ?';
    connection.query(query, [updatedData, id], (error, results) => {
      if (error) reject(error);
      resolve(results.affectedRows > 0 ? updatedData : null);
    });
  });
};

Veterinaire.deleteHabitat = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM habitats WHERE id = ?';
    connection.query(query, [id], (error, results) => {
      if (error) reject(error);
      resolve(results.affectedRows > 0);
    });
  });
};

module.exports = Veterinaire;
