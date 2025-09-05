const db = require('../models');
const PatientDoctorMapping = db.PatientDoctorMapping;
const Patient = db.Patient;
const Doctor = db.Doctor;

// @desc    Assign a doctor to a patient
// @route   POST /api/mappings
const addMapping = async (req, res) => {
    try {
        const { patientId, doctorId } = req.body;
        // Optional: Check if the patient belongs to the logged-in user
        const patient = await Patient.findOne({
            where: { id: patientId, userId: req.user.id },
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you are not authorized.' });
        }

        const mapping = await PatientDoctorMapping.create({ patientId, doctorId });
        res.status(201).json(mapping);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all mappings (for admin or debugging)
// @route   GET /api/mappings
const getAllMappings = async (req, res) => {
    try {
        const mappings = await PatientDoctorMapping.findAll();
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// @desc    Get all doctors for a specific patient
// @route   GET /api/mappings/patient/:patient_id
const getMappingsForPatient = async (req, res) => {
    try {
         // Ensure the patient belongs to the logged-in user
        const patient = await Patient.findOne({
            where: { id: req.params.patient_id, userId: req.user.id },
        });

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found or you are not authorized.' });
        }

        const mappings = await PatientDoctorMapping.findAll({
            where: { patientId: req.params.patient_id },
            include: [{ model: Doctor, attributes: ['name', 'specialization'] }],
        });
        res.json(mappings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// @desc    Remove a doctor from a patient (delete a mapping)
// @route   DELETE /api/mappings/:id
const deleteMapping = async (req, res) => {
    try {
        const mapping = await PatientDoctorMapping.findByPk(req.params.id);

        if (!mapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }
        
        // Optional: Add a check here to ensure the user owns the patient in the mapping
        
        await mapping.destroy();
        res.json({ message: 'Mapping removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Make sure this export block is at the end of the file
module.exports = {
    addMapping,
    getAllMappings,
    getMappingsForPatient,
    deleteMapping,
};

