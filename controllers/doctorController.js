const { Doctor } = require('../models');

// @desc    Add a new doctor
// @route   POST /api/doctors
// @access  Private
const addDoctor = async (req, res) => {
    try {
        const { name, specialization, contactInfo } = req.body;
        const newDoctor = await Doctor.create({ name, specialization, contactInfo });
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ message: 'Error adding doctor', error: error.message });
    }
};

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Private
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single doctor by ID
// @route   GET /api/doctors/:id
// @access  Private
const getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a doctor's details
// @route   PUT /api/doctors/:id
// @access  Private
const updateDoctor = async (req, res) => {
    try {
        const { name, specialization, contactInfo } = req.body;
        const doctor = await Doctor.findByPk(req.params.id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.contactInfo = contactInfo || doctor.contactInfo;

        await doctor.save();
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ message: 'Error updating doctor', error: error.message });
    }
};

// @desc    Delete a doctor
// @route   DELETE /api/doctors/:id
// @access  Private
const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        await doctor.destroy();
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    addDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
};

