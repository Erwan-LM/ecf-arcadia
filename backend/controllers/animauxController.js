const Animaux = require('../models/Animaux');

const getAllAnimaux = (req, res) => {
  Animaux.getAll((err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving animals from database');
    }
    res.json(results);
  });
};

module.exports = {
  getAllAnimaux
};
