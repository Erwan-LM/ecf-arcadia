const jwt = require('jsonwebtoken');

// Middleware d'authentification avec JWT
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Stocker l'utilisateur dans req
    next();
  });
}

// Middleware pour vérifier le rôle de l'utilisateur
function checkRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access forbidden: insufficient role" });
    }
    next();
  };
}

module.exports = { authenticateToken, checkRole };
