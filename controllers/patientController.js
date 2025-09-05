const db = require('../models');
const Patient = db.Patient;

// @desc    Add a new patient
// @route   POST /api/patients
const addPatient = async (req, res) => {
    try {
        const { name, age, gender, address } = req.body;
        const userId = req.user.id; // From authMiddleware

        const patient = await Patient.create({
            name,
            age,
            gender,
            address,
            userId,
        });

        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all patients for the logged-in user
// @route   GET /api/patients
const getPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({ where: { userId: req.user.id } });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id, // Ensure user can only get their own patient
            },
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update patient details
// @route   PUT /api/patients/:id
const updatePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const updatedPatient = await patient.update(req.body);
        res.json(updatedPatient);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        await patient.destroy();
        res.json({ message: 'Patient removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Make sure this export block is at the end of your file
module.exports = {
    addPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};

