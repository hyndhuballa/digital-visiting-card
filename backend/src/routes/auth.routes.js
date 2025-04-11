const express = require('express');
const router = express.Router();
const { register, login, logout, getCurrentUser } = require('../controllers/auth.controller');
const auth = require('../middleware/auth.middleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected routes
router.get('/me', auth, getCurrentUser);

module.exports = router;