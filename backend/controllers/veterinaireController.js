const Veterinaire = require('../models/Veterinaire');

exports.getAllComptesRendus = async (req, res) => {
    try {
        const comptesRendus = await Veterinaire.getAllComptesRendus();
        res.status(200).json(comptesRendus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCompteRendu = async (req, res) => {
    try {
        const compteRendu = await Veterinaire.getCompteRendu(req.params.id);
        if (!compteRendu) {
            return res.status(404).json({ message: 'Compte rendu non trouvé' });
        }
        res.status(200).json(compteRendu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCompteRendu = async (req, res) => {
    const { id_utilisateur, id_animal, date, rapport } = req.body;
    try {
        const nouveauCompteRendu = await Veterinaire.ajouterCompteRendu(id_utilisateur, id_animal, date, rapport);
        res.status(201).json(nouveauCompteRendu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCompteRendu = async (req, res) => {
    try {
        const compteRendu = await Veterinaire.updateCompteRendu(req.params.id, req.body);
        if (!compteRendu) {
            return res.status(404).json({ message: 'Compte rendu non trouvé' });
        }
        res.status(200).json(compteRendu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCompteRendu = async (req, res) => {
    try {
        const deletedCompteRendu = await Veterinaire.deleteCompteRendu(req.params.id);
        if (!deletedCompteRendu) {
            return res.status(404).json({ message: 'Compte rendu non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllHabitats = async (req, res) => {
    try {
        const habitats = await Veterinaire.getAllHabitats();
        res.status(200).json(habitats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getHabitatDetail = async (req, res) => {
    const habitatId = req.params.id;
    try {
        const habitat = await Veterinaire.getHabitatDetail(habitatId);
        if (!habitat) {
            return res.status(404).json({ message: 'Habitat not found' });
        }
        res.status(200).json(habitat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createHabitat = async (req, res) => {
    const { nom, images, description } = req.body;
    try {
        const nouveauHabitat = await Veterinaire.createHabitat(nom, images, description);
        res.status(201).json(nouveauHabitat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateHabitat = async (req, res) => {
    const habitatId = req.params.id;
    const { nom, images, description } = req.body;
    try {
        const updatedHabitat = await Veterinaire.updateHabitat(habitatId, { nom, images, description });
        if (!updatedHabitat) {
            return res.status(404).json({ message: 'Habitat non trouvé' });
        }
        res.status(200).json(updatedHabitat);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteHabitat = async (req, res) => {
    const habitatId = req.params.id;
    try {
        const deletedHabitat = await Veterinaire.deleteHabitat(habitatId);
        if (!deletedHabitat) {
            return res.status(404).json({ message: 'Habitat non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
