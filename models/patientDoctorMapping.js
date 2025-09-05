const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const PatientDoctorMapping = sequelize.define('PatientDoctorMapping', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Patients', // This is the table name
                key: 'id',
            },
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Doctors', // This is the table name
                key: 'id',
            },
        },
    }, {
        // Model options
        timestamps: true, // Adds createdAt and updatedAt columns
        tableName: 'PatientDoctorMappings',
    });

    return PatientDoctorMapping;
};

