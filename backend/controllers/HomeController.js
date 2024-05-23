// Importer le modèle HabitatBiom
const HabitatBiom = require('../models/HomeModel');

// Définir le contrôleur HomeController
const HomeController = {
  // Fonction pour récupérer tous les habitats biom
  getAllHabitatBiomes: (req, res) => {
    HabitatBiom.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Some error occurred while retrieving habitat biomes.',
        });
      } else {
        res.send(data);
      }
    });
  },
  
  // Autres fonctions du contrôleur à implémenter selon les besoins
};

// Exporter le contrôleur HomeController
module.exports = HomeController;
