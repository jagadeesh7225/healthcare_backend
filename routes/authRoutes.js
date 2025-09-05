const express = require('express');
const router = express.Router();

// This is the line that needs to be correct.
// We are using destructuring { } to pull out the functions from the exports.
const { register, login } = require('../controllers/authController');

// Route for user registration
// Now, 'register' is a valid function
router.post('/register', register);

// Route for user login
// And 'login' is a valid function
router.post('/login', login);

module.exports = router;

