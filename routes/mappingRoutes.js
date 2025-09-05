const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Correctly import the controller functions using destructuring
const {
    addMapping,
    getAllMappings,
    getMappingsForPatient,
    deleteMapping,
} = require('../controllers/mappingController');

// Apply authentication to all mapping routes
router.use(authMiddleware);

// Route for creating a new mapping and getting all mappings
router.route('/')
    .post(addMapping)
    .get(getAllMappings);

// Route to get all mappings for a specific patient
router.route('/patient/:patient_id')
    .get(getMappingsForPatient);

// Route to delete a specific mapping by its own ID
router.route('/:id')
    .delete(deleteMapping);

module.exports = router;

