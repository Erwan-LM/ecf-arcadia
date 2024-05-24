const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Fonction pour créer un compte employé ou vétérinaire
exports.creerCompte = async (req, res) => {
    const { type, email } = req.body;
    
    // Vérification de la validité de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Adresse e-mail invalide' });
    }

    // Génération d'un mot de passe sécurisé
    const motDePasse = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Envoi d'un e-mail contenant l'identifiant de l'utilisateur
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'process.env.EMAIL_USER',
            pass: 'process.env.EMAIL_PASS'
        }
    });

    const mailOptions = {
        from: 'process.env.EMAIL_USER',
        to: email,
        subject: 'Création de votre compte',
        text: `Bonjour,\n\nVotre compte a été créé avec succès.\n\nIdentifiant : ${email}\nMot de passe : ${motDePasse}\n\nCordialement, José`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'e-mail:', error);
        } else {
            console.log('E-mail envoyé:', info.response);
        }
    });

    // Logique pour créer le compte utilisateur dans la base de données
    const sql = 'INSERT INTO Utilisateurs (type, email, mot_de_passe) VALUES (?, ?, ?)';
    const values = [type, email, hashedPassword];
    connection.query(sql, values, (error, results) => {
        if (error) {
            console.error('Error creating user account:', error);
            res.status(500).json({ message: 'Erreur lors de la création du compte utilisateur' });
            return;
        }
        console.log('User account created successfully');
        res.status(201).json({ message: 'Compte utilisateur créé avec succès' });
    });
};

// Fonction pour modifier les services du zoo
exports.modifierServices = async (req, res) => {
    try {
        // Logique pour modifier les services du zoo
    } catch (error) {
        console.error('Erreur lors de la modification des services:', error);
        res.status(500).json({ message: 'Erreur lors de la modification des services' });
    }
};

// Fonction pour modifier les habitats du zoo
exports.modifierHabitat = async (req, res) => {
    try {
        // Logique pour modifier les habitats du zoo
    } catch (error) {
        console.error('Erreur lors de la modification des habitats:', error);
        res.status(500).json({ message: 'Erreur lors de la modification des habitats' });
    }
};

// Fonction pour modifier les animaux du zoo
exports.modifierAnimaux = async (req, res) => {
    try {
        // Logique pour modifier les animaux du zoo
    } catch (error) {
        console.error('Erreur lors de la modification des animaux:', error);
        res.status(500).json({ message: 'Erreur lors de la modification des animaux' });
    }
};

// Fonction pour récupérer la liste des comptes rendus
exports.listeComptesRendus = async (req, res) => {
    const sql = 'SELECT * FROM ComptesRendus';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Error retrieving consultation reports:', error);
            res.status(500).json({ message: 'Erreur lors de la récupération des comptes rendus' });
            return;
        }
        console.log('Consultation reports retrieved successfully');
        res.status(200).json(results);
    });
};

// Fonction pour filtrer les comptes rendus par animal ou par date
exports.filtrerComptesRendus = async (req, res) => {
    const { animal, date } = req.query;
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
            res.status(500).json({ message: 'Erreur lors du filtrage des comptes rendus' });
            return;
        }
        console.log('Consultation reports filtered successfully');
        res.status(200).json(results);
    });
};
