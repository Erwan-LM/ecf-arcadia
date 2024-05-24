const connection = require('../models/Utilisateur');

exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        // Rechercher l'utilisateur dans la base de données
        const query = 'SELECT * FROM Utilisateurs WHERE email = ?';
        connection.query(query, [email], (error, results) => {
            if (error) {
                console.error('Error during login:', error);
                return res.status(500).json({ message: 'Erreur lors de la connexion' });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Email incorrect' });
            }

            const utilisateur = results[0];

            // Vérifier le mot de passe
            if (motDePasse !== utilisateur.mot_de_passe) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }

            // Si les informations sont correctes, renvoyer l'utilisateur avec son type
            res.status(200).json({ type: utilisateur.type });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
};

exports.register = async (req, res) => {
    const { type, email, motDePasse } = req.body;

    try {
        // Insérer l'utilisateur dans la base de données
        const query = 'INSERT INTO Utilisateurs (type, email, mot_de_passe) VALUES (?, ?, ?)';
        connection.query(query, [type, email, motDePasse], (error, results) => {
            if (error) {
                console.error('Error during registration:', error);
                return res.status(500).json({ message: 'Erreur lors de l\'inscription' });
            }

            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
};
