require('dotenv').config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const utilisateursRoutes = require('./backend/routes/utilisateurs');
const veterinaireRoutes = require('./backend/routes/veterinaireRoute');
const employesRoutes = require('./backend/routes/employesRoutes');
const servicesRoutes = require('./backend/routes/servicesRoutes'); // Import unique
const animauxRoutes = require('./backend/routes/animauxRoutes');
const administrateursRoutes = require('./backend/routes/administrateursRoutes');
const avisRoutes = require('./backend/routes/avisRoutes');

const app = express();
const port = process.env.PORT || 3000;

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

// Servir les fichiers statiques du dossier racine des assets
app.use(express.static(path.join(__dirname, 'assets')));

// Utiliser body-parser pour analyser les requêtes JSON
app.use(bodyParser.json());

// Utiliser les routes d'authentification
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/veterinaire', veterinaireRoutes);
app.use('/api/employes', employesRoutes);
app.use('/api/administrateurs', administrateursRoutes);
app.use('/api/services', servicesRoutes); // Import unique
app.use('/api/animaux', animauxRoutes);
app.use('/api', avisRoutes);

// Routes pour les habitats
app.get('/api/habitat/:type', (req, res) => {
  console.log("Received GET request at '/api/habitat/:type'");
  const habitatType = req.params.type;
  connection.query(
    'SELECT * FROM habitat_biom WHERE habitat = ?',
    [habitatType],
    (error, results) => {
      if (error) {
        console.error('Error retrieving data from database:', error);
        res.status(500).send('Error retrieving data from database');
        return;
      }
      console.log("Data retrieved successfully:", results);
      res.json(results);
    }
  );
});

// Routes existantes
app.get('/', (req, res) => {
  console.log("Received GET request at '/'");
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
