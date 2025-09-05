const express = require('express');
const router = express.Router();
const {
    getAllDoctors,
    addDoctor,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctorController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for /api/doctors
router.route('/')
    .get(getAllDoctors) // Anyone can view doctors
    .post(authMiddleware, addDoctor); // Only authenticated users can add

// Routes for /api/doctors/:id
router.route('/:id')
    .get(getDoctorById) // Anyone can view a specific doctor
    .put(authMiddleware, updateDoctor) // Only authenticated users can update
    .delete(authMiddleware, deleteDoctor); // Only authenticated users can delete

module.exports = router;

