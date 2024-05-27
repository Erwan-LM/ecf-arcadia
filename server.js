require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const bodyParser = require('body-parser');
const utilisateursRoutes = require('./backend/routes/utilisateurs');
const veterinaireRoutes = require('./backend/routes/veterinaireRoute');
const employesRoutes = require('./backend/routes/employesRoutes');
const servicesRoutes = require('./backend/routes/servicesRoutes');
const animauxRoutes = require('./backend/routes/animauxRoutes');
const administrateursRoutes = require('./backend/routes/administrateursRoutes');
const avisRoutes = require('./backend/routes/avisRoutes');
const contactRoutes = require('./backend/routes/contactRoutes');
const { getLocalIpAddress } = require('./config');
const os = require('os');
const fs = require('fs');
const database = require('./database/database');

const app = express();
const port = process.env.PORT || 3000;

// Créer une connexion à la base de données en utilisant la fonction exportée du module database
const connection = database.createConnection();

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());

app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/veterinaire', veterinaireRoutes);
app.use('/api/employes', employesRoutes);
app.use('/api/administrateurs', administrateursRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/animaux', animauxRoutes);
app.use('/api', avisRoutes);
app.use('/api/contact', contactRoutes);

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

app.get('/', (req, res) => {
  console.log("Received GET request at '/'");
  res.send('Hello World!');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
