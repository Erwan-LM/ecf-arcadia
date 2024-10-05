const db = require('../models/db'); // Votre fichier de connexion à la base de données

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM utilisateur', (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results);
    });
};

// Récupérer un utilisateur par username
exports.getUserByUsername = (req, res) => {
    const { username } = req.params;
    db.query('SELECT * FROM utilisateur WHERE username = ?', [username], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(results[0]);
    });
};

// Créer un nouvel utilisateur
exports.createUser = (req, res) => {
    const { username, password, nom, prenom } = req.body;
    db.query('INSERT INTO utilisateur (username, password, nom, prenom) VALUES (?, ?, ?, ?)', [username, password, nom, prenom], (err, results) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: results.insertId, username });
    });
};

// Mettre à jour un utilisateur
exports.updateUser = (req, res) => {
    const { username } = req.params;
    const { password, nom, prenom } = req.body;
    db.query('UPDATE utilisateur SET password = ?, nom = ?, prenom = ? WHERE username = ?', [password, nom, prenom, username], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Utilisateur mis à jour' });
    });
};

// Supprimer un utilisateur
exports.deleteUser = (req, res) => {
    const { username } = req.params;
    db.query('DELETE FROM utilisateur WHERE username = ?', [username], (err) => {
        if (err) return res.status(500).json(err);
        res.status(200).json({ message: 'Utilisateur supprimé' });
    });
};
