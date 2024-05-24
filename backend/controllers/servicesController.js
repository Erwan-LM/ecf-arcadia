const Services = require('../models/Services');

exports.getAllServices = async (req, res) => {
    try {
        const services = await Services.getAllServices();
        res.status(200).json(services);
    } catch (error) {
        console.error('Erreur lors de la récupération des services :', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des services' });
    }
};
