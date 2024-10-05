// controllers/serviceController.js
const { query } = require('../db');

// Fonction pour récupérer les services
const getServices = async (req, res) => {
  try {
    const services = await query('SELECT * FROM service');
    res.json(services);
  } catch (error) {
    res.status(500).send('Error retrieving services');
  }
};

module.exports = { getServices };
