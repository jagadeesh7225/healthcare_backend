'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Initialize Sequelize connection from .env variables
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Load all model files from the current directory
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if associations are defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the sequelize instance and Sequelize constructor to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Define associations explicitly after all models are loaded
const { User, Patient, Doctor, PatientDoctorMapping } = db;

// User-Patient relationship (One-to-Many)
if (User && Patient) {
    User.hasMany(Patient, { foreignKey: 'userId', onDelete: 'CASCADE' });
    Patient.belongsTo(User, { foreignKey: 'userId' });
}


// Patient-Doctor relationship (Many-to-Many through PatientDoctorMapping)
if (Patient && Doctor && PatientDoctorMapping) {
    Patient.belongsToMany(Doctor, { through: PatientDoctorMapping, foreignKey: 'patientId' });
    Doctor.belongsToMany(Patient, { through: PatientDoctorMapping, foreignKey: 'doctorId' });
}


module.exports = db;

