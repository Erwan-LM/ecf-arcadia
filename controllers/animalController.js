const db = require('../db');

exports.getAnimalsByHabitat = (req, res) => {
  const { habitatId } = req.params;
  db.query('SELECT a.animal_id, a.prenom AS animal, a.etat AS state, r.label AS race, a.habitat_id, i.image_data AS photo_path FROM animal AS a JOIN race AS r ON a.race_id = r.race_id LEFT JOIN image AS i ON a.habitat_id = i.habitat_id WHERE a.habitat_id = ?', [habitatId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
