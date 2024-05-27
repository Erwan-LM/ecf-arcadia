const database = require('../../database/database');
const connection = database.createConnection();
const Contact = {};

Contact.create = (titre, description, email, callback) => {
  connection.query('INSERT INTO Contact (titre, description, email) VALUES (?, ?, ?)', [titre, description, email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = Contact;
module.exports = connection;
