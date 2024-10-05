require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const { authenticateToken, checkRole } = require('./middlewares/authMiddleware');
const { connection } = require('./db'); // Importez la connexion depuis db.js
const serviceRoutes = require('./routes/service'); // Importer les routes de service

const app = express();
const port = process.env.PORT || 3000;


// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware pour traiter le JSON
app.use(express.json());

// Servir les fichiers statiques du dossier 'assets'
app.use(express.static(path.join(__dirname, 'assets')));

// Routes publiques
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Utiliser les routes de service
app.use('/api/services', serviceRoutes);

// Fonction sécurisée pour récupérer des données d'une table
const fetchDataFromTable = (table, res) => {
  const validTables = ['utilisateur', 'role', 'animal', 'habitat', 'image', 'service', 'avis'];
  
  // Vérifier si la table demandée est valide
  if (!validTables.includes(table)) {
    return res.status(400).json({ error: 'Invalid table name' });
  }

  connection.query(`SELECT * FROM ??`, [table], (error, results) => {
    if (error) {
      console.error(`Error retrieving data from ${table}:`, error);
      return res.status(500).json({ error: `Error retrieving data from ${table}` });
    }
    res.json(results);
  });
};

// Autres routes
app.get('/api/utilisateurs', (req, res) => fetchDataFromTable('utilisateur', res));
app.get('/api/roles', (req, res) => fetchDataFromTable('role', res));
app.get('/api/animaux', (req, res) => fetchDataFromTable('animal', res));
app.get('/api/habitats', (req, res) => fetchDataFromTable('habitat', res));
app.get('/api/images', (req, res) => fetchDataFromTable('image', res));
app.get('/api/avis', (req, res) => {
  connection.query('SELECT * FROM avis WHERE isVisible = TRUE', (error, results) => {
    if (error) {
      console.error('Error retrieving avis data:', error);
      return res.status(500).json({ error: 'Error retrieving avis data' });
    }
    res.json(results);
  });
});

// Routes protégées
app.post('/admin/utilisateurs', authenticateToken, checkRole('Administrateur'), (req, res) => {
  const { username, password, role } = req.body;

  // Valider les entrées
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Username, password, and role are required' });
  }

  const query = 'INSERT INTO utilisateur (username, password, role) VALUES (?, ?, ?)';
  connection.query(query, [username, password, role], (error, results) => {
    if (error) {
      console.error('Error adding user:', error);
      return res.status(500).json({ error: 'Error adding user' });
    }
    res.status(201).json({ message: 'User added successfully' });
  });
});

app.post('/employe/habitats', authenticateToken, checkRole('Employé'), (req, res) => {
  const { nom, description } = req.body;

  // Valider les entrées
  if (!nom || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  const query = 'INSERT INTO habitat (nom, description) VALUES (?, ?)';
  connection.query(query, [nom, description], (error, results) => {
    if (error) {
      console.error('Error adding habitat:', error);
      return res.status(500).json({ error: 'Error adding habitat' });
    }
    res.status(201).json({ message: 'Habitat added successfully' });
  });
});

app.post('/veterinaire/rapport', authenticateToken, checkRole('Vétérinaire'), (req, res) => {
  const { animal_id, diagnostic, traitement } = req.body;

  // Valider les entrées
  if (!animal_id || !diagnostic || !traitement) {
    return res.status(400).json({ error: 'Animal ID, diagnostic, and treatment are required' });
  }

  const query = 'INSERT INTO rapport_veterinaire (animal_id, diagnostic, traitement) VALUES (?, ?, ?)';
  connection.query(query, [animal_id, diagnostic, traitement], (error, results) => {
    if (error) {
      console.error('Error adding veterinary report:', error);
      return res.status(500).json({ error: 'Error adding veterinary report' });
    }
    res.status(201).json({ message: 'Veterinary report added successfully' });
  });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
