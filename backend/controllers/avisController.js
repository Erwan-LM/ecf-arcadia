const connection = require('../models/avisModel');

exports.createAvis = (req, res) => {
  const { pseudo, avis } = req.body;
  const query = 'INSERT INTO Avis (pseudo, avis) VALUES (?, ?)';
  connection.query(query, [pseudo, avis], (error, results) => {
    if (error) {
      res.status(500).send('Error saving the review');
      return;
    }
    res.status(201).json({ id: results.insertId, pseudo, avis });
  });
};

exports.getValidAvis = (req, res) => {
  const query = 'SELECT * FROM Avis WHERE est_valide = TRUE';
  connection.query(query, (error, results) => {
    if (error) {
      res.status(500).send('Error retrieving reviews');
      return;
    }
    res.json(results);
  });
};

exports.updateAvisStatus = (req, res) => {
  const { id, est_valide } = req.body;
  const query = 'UPDATE Avis SET est_valide = ? WHERE id = ?';
  connection.query(query, [est_valide, id], (error) => {
    if (error) {
      res.status(500).send('Error updating review status');
      return;
    }
    res.sendStatus(200);
  });
};
