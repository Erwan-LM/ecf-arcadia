const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecf_zoo',
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/habitat/:type', (req, res) => {
  const habitatType = req.params.type;
  connection.query(
    'SELECT * FROM habitat_biom WHERE habitat = ?',
    [habitatType],
    (error, results) => {
      if (error) {
        res.status(500).send('Error retrieving data from database');
        return;
      }
      res.json(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
