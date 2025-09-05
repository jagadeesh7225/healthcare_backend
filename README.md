Healthcare Backend API
A secure and scalable backend system for a healthcare application built with Node.js, Express, PostgreSQL, and Sequelize. This API provides JWT-based user authentication and full CRUD functionality for managing patient and doctor records.

Features
Secure User Authentication: User registration and login using JSON Web Tokens (JWT).

Patient Management: Authenticated users can create, read, update, and delete their own patient records.

Doctor Management: Authenticated users can manage a central list of doctors.

Patient-Doctor Mapping: Assign doctors to specific patients and manage these relationships.

Relational Database: Uses PostgreSQL with the Sequelize ORM for robust data modeling and relationships.

Environment-Based Configuration: Securely manages sensitive keys and database credentials using a .env file.

Project Structure
The project follows a standard pattern, organized for scalability and separation of concerns.

healthcare-backend/
├── controllers/
│   ├── authController.js       # Logic for user registration and login.
│   ├── patientController.js    # Logic for patient CRUD operations.
│   ├── doctorController.js     # Logic for doctor CRUD operations.
│   └── mappingController.js    # Logic for assigning doctors to patients.
│
├── middleware/
│   └── authMiddleware.js       # Verifies JWT to protect routes.
│
├── models/
│   ├── user.js                 # Sequelize model for Users.
│   ├── patient.js              # Sequelize model for Patients.
│   ├── doctor.js               # Sequelize model for Doctors.
│   ├── patientDoctorMapping.js # Sequelize model for the join table.
│   └── index.js                # Initializes Sequelize and model associations.
│
├── routes/
│   ├── authRoutes.js           # API routes for /api/auth.
│   ├── patientRoutes.js        # API routes for /api/patients.
│   ├── doctorRoutes.js         # API routes for /api/doctors.
│   └── mappingRoutes.js        # API routes for /api/mappings.
│
├── .env                        # Stores environment variables (not committed to Git).
├── .gitignore                  # Specifies files for Git to ignore.
├── index.js                    # The main entry point for the application.
├── package.json                # Manages project dependencies and scripts.
└── README.md                   # This file.

Prerequisites
Before you begin, ensure you have the following installed on your local machine:

Node.js (v18 or newer recommended)

PostgreSQL

Setup and Installation
Follow these steps to get your development environment set up and running.

1. Install Dependencies

npm install

2. Set Up the PostgreSQL Database

Make sure your PostgreSQL server is running.

Connect to PostgreSQL (using psql or a GUI tool like pgAdmin).

Create a new database for the project:

CREATE DATABASE healthcare_db;

3. Configure Environment Variables

Create a new file named .env in the root of your project folder.

Copy the contents of the template below into your new .env file.

Important: Fill in your actual PostgreSQL database credentials.

# .env file template

# Server Configuration
PORT=8080

# Database Configuration (PostgreSQL)
DB_HOST=localhost
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=healthcare_db
DB_DIALECT=postgres

# JWT Secret Key - Change this to a long, random string
JWT_SECRET=a_very_strong_and_secret_key_for_jwt

Running the Application
Once the setup is complete, you can start the server in development mode.

npm run dev

The server will start on http://localhost:8080. The nodemon script will automatically restart the server whenever you save a file.

You should see the following output in your terminal, which confirms the server is running and the database is connected:

Database synced successfully.
Server is running on port 8080.

API Endpoints Documentation
Use an API client like Postman, Insomnia, or the Thunder Client VS Code extension to test the endpoints.

Authentication
Method

Endpoint

Description

Protected

Body Example

POST

/api/auth/register

Register a new user.

No

{"name":"Sonia", "email":"sonia@ex.com", "password":"123"}

POST

/api/auth/login

Log in a user.

No

{"email":"sonia@ex.com", "password":"123"}

Patient Management
Note: All patient routes are protected. You must provide a valid JWT in the Authorization: Bearer <token> header.

Method

Endpoint

Description

POST

/api/patients

Add a new patient for the logged-in user.

GET

/api/patients

Get all patients created by the logged-in user.

GET

/api/patients/:id

Get details of a specific patient by its ID.

PUT

/api/patients/:id

Update the details of a specific patient.

DELETE

/api/patients/:id

Delete a specific patient record.

Body Example for POST / PUT:

{
  "name": "Raj Kumar",
  "age": 45,
  "gender": "Male",
  "address": "123 Main St, Amritsar"
}

Doctor Management
Method

Endpoint

Description

Protected

POST

/api/doctors

Add a new doctor.

Yes

GET

/api/doctors

Get a list of all doctors.

No

GET

/api/doctors/:id

Get details of a specific doctor.

No

PUT

/api/doctors/:id

Update a doctor's details.

Yes

DELETE

/api/doctors/:id

Delete a doctor record.

Yes

Body Example for POST / PUT:

{
  "name": "Dr. Anjali Verma",
  "specialization": "Cardiologist",
  "contactInfo": "dr.anjali@hospital.com"
}

Patient-Doctor Mappings
Note: All mapping routes are protected.

Method

Endpoint

Description

POST

/api/mappings

Assign a doctor to a patient.

GET

/api/mappings

Get all patient-doctor mappings.

GET

/api/mappings/patient/:id

Get all doctors assigned to a specific patient.

DELETE

/api/mappings/:id

Remove a doctor-patient link by the mapping's ID.

Body Example for POST:

{
  "patientId": 1,
  "doctorId": 2
}

Technology Stack
Backend: Node.js, Express.js

Database: PostgreSQL

ORM: Sequelize

Authentication: JSON Web Tokens (JWT), bcrypt.js

Environment Variables: dotenv

Development: nodemon
