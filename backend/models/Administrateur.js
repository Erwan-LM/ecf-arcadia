const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

// Définition du modèle Administrateur
const Administrateur = {};

// Méthode pour créer un compte administrateur
Administrateur.creerCompte = (email, motDePasse, callback) => {
  const type = 'Administrateur'; // Spécifier le type de compte
  // Hasher le mot de passe avant de l'enregistrer dans la base de données
  bcrypt.hash(motDePasse, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      callback(err, null);
      return;
    }
    const sql = 'INSERT INTO Utilisateurs (type, email, mot_de_passe) VALUES (?, ?, ?)';
    const values = [type, email, hash];
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error('Error creating administrator account:', error);
        callback(error, null);
        return;
      }
      console.log('Administrator account created successfully');
      callback(null, results);
    });
  });
};

// Méthode pour modifier les services du zoo
Administrateur.modifierServices = (nouveauxServices, callback) => {
  // Logique pour modifier les services du zoo
  // Récupérer la table des services depuis la base de données
  const sql = 'SELECT * FROM services';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching services:', error);
      callback(error, null);
      return;
    }
    console.log('Fetched services:', results);
    // Maintenant, affichez ces services dans un dashboard avec la possibilité de les modifier et de les valider
    callback(null, results);
  });
};

// Méthode pour modifier les habitats du zoo
Administrateur.modifierHabitat = (nouveauxHabitats, callback) => {
  // Logique pour modifier les habitats du zoo
  // Récupérer la liste des habitats depuis la base de données
  const sql = 'SELECT DISTINCT habitat FROM habitat_biom';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching habitats:', error);
      callback(error, null);
      return;
    }
    console.log('Fetched habitats:', results);
    // Maintenant, affichez ces habitats dans un menu déroulant avec la possibilité d'ajouter, de modifier et de supprimer des habitats
    callback(null, results);
  });
};

// Méthode pour modifier les animaux du zoo
Administrateur.modifierAnimaux = (nouveauxAnimaux, callback) => {
  // Logique pour modifier les animaux du zoo
  // Récupérer la liste des animaux depuis la base de données
  const sql = 'SELECT * FROM Animaux';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching animals:', error);
      callback(error, null);
      return;
    }
    console.log('Fetched animals:', results);
    // Maintenant, affichez ces animaux dans un dashboard avec la possibilité d'ajouter, de modifier et de supprimer des animaux
    callback(null, results);
  });
};

// Méthode pour récupérer la liste des comptes rendus
Administrateur.listeComptesRendus = (callback) => {
  // Logique pour récupérer la liste des comptes rendus
  // Récupérer les comptes rendus depuis la base de données
  const sql = 'SELECT * FROM ComptesRendus';
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error fetching consultation reports:', error);
      callback(error, null);
      return;
    }
    console.log('Fetched consultation reports:', results);
    // Maintenant, affichez ces comptes rendus dans un dashboard avec un bouton pour afficher ou masquer chaque compte rendu sous forme de carte
    callback(null, results);
  });
};

// Méthode pour filtrer les comptes rendus par animal ou par date
Administrateur.filtrerComptesRendus = (filtre, callback) => {
  // Logique pour filtrer les comptes rendus
  const { animal, date } = filtre;
  let sql = 'SELECT * FROM ComptesRendus WHERE 1';
  const values = [];
  if (animal) {
    sql += ' AND id_animal = ?';
    values.push(animal);
  }
  if (date) {
    sql += ' AND date = ?';
    values.push(date);
  }
  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Error filtering consultation reports:', error);
      callback(error, null);
      return;
    }
    console.log('Filtered consultation reports:', results);
    // Maintenant, affichez ces comptes rendus filtrés dans un dashboard
    callback(null, results);
  });
};

module.exports = Administrateur;
