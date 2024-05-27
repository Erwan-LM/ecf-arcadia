const Contact = require('../models/Contact');

const createContact = (req, res) => {
  const { titre, description, email } = req.body;
  Contact.create(titre, description, email, (err, results) => {
    if (err) {
      return res.status(500).send('Error creating contact');
    }
    res.status(201).json({ message: 'Contact created successfully' });
  });
};

module.exports = {
  createContact
};
