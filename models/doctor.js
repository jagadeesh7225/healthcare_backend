const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        specialization: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactInfo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        // Model options
        timestamps: true, // Adds createdAt and updatedAt columns
        tableName: 'Doctors',
    });

    return Doctor;
};

