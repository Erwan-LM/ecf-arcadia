const db = require('../db');

exports.getHabitats = (req, res) => {
  db.query('SELECT * FROM habitat', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

exports.getHabitatById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM habitat WHERE habitat_id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0]);
  });
};
