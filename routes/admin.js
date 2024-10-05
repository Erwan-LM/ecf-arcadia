const express = require('express');
const { addUtilisateur } = require('../controllers/adminController');
const { authenticateToken, checkRole } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/utilisateurs', authenticateToken, checkRole('Administrateur'), addUtilisateur);

module.exports = router;
