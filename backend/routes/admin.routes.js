const express = require('express');
const { login } = require('../controllers/admin.controller');
const router = express.Router();

// Route pour l'authentification de l'admin
router.post('/login', login);

module.exports = router;