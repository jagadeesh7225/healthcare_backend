const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Correctly import the controller functions using destructuring
const {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = require('../controllers/patientController');

// Apply the authentication middleware to all routes in this file
router.use(authMiddleware);

// Define the routes using the correctly imported functions
router.route('/').post(addPatient).get(getPatients);
router.route('/:id').get(getPatientById).put(updatePatient).delete(deletePatient);

module.exports = router;

