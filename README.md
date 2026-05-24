# Hospital Management System API

A RESTful Hospital Management System API built with Node.js, Express.js, MongoDB, and Mongoose for the TS Academy Backend Development Capstone Project.

This project was developed by Group 4 and focuses on building a backend system that supports real hospital operations such as authentication, patient management, doctor management, appointment booking, consultation, lab requests, lab results, prescriptions, pharmacy dispensing, billing, and payment tracking.

## Project Overview

The Hospital Management System API is designed to help manage hospital workflows from patient registration to final billing.

The system supports:

- User registration and login
- JWT authentication
- Role-based access control
- Patient management
- Doctor and department management
- Appointment booking and status updates
- Doctor consultation records
- Medical records
- Lab requests and lab results
- Prescription management
- Pharmacy dispensing
- Billing and payment status tracking
- Centralized error handling
- Request validation
- API documentation using Postman

## Capstone Project Requirement Coverage

This project meets the main backend capstone requirements:

| Requirement | Implementation |
|---|---|
| Authentication and Authorization | JWT authentication and role-based access control |
| Core CRUD Operations | CRUD operations across users, patients, doctors, departments, appointments, prescriptions, billing, and more |
| Database Integration | MongoDB with Mongoose models and schema relationships |
| Business Logic | Appointment availability, lab result flow, prescription dispensing, billing payment status, and role restrictions |
| API Security | Protected routes, password hashing, JWT verification, and role middleware |
| Logging and Error Handling | Morgan request logging and centralized error middleware |
| API Documentation | Postman collection inside `docs/postman_collection.json` |
| Project Structure | Clean folder structure using controllers, services, models, routes, middlewares, utils, validations, and config |

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- bcryptjs
- Joi
- Morgan
- dotenv
- CORS
- Postman

## Project Structure

```bash
hospital-management-api/
├── docs/
│   └── postman_collection.json
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── swagger.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validations/
│   ├── app.js
│   └── seed.js
├── tests/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## Installation

Clone the repository:

```bash
git clone https://github.com/dasodhub/hospital-management-api.git
cd hospital-management-api
npm install
```

## Environment Variables

Create a `.env` file in the project root using `.env.example` as a guide.

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Do not push the real `.env` file to GitHub.

## Running The Project

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Health check:

```bash
GET http://localhost:5050/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "Server is healthy"
}
```

## API Base URL

```bash
http://localhost:5050/api
```

## User Roles

The system supports the following roles:

| Role | Description |
|---|---|
| `admin` | Full system access |
| `doctor` | Handles consultations, prescriptions, and lab requests |
| `nurse` | Can view patients and medical-related records |
| `receptionist` | Can create patients and manage appointments |
| `lab_scientist` | Handles lab requests and uploads lab results |
| `pharmacist` | Dispenses prescriptions |
| `billing_officer` | Handles billing and payments |
| `patient` | Can access patient-related actions where permitted |

## Main Hospital Workflow

The expected workflow is:

1. Register admin
2. Login admin
3. Create department
4. Register doctor user
5. Create doctor profile
6. Create patient
7. Book appointment
8. Confirm appointment
9. Create consultation
10. Create lab request
11. Upload lab result
12. Create prescription
13. Dispense prescription
14. Create bill
15. Mark bill as paid
16. Complete consultation
17. Complete appointment

## API Endpoints

### Auth Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user and return JWT token | Public |
| GET | `/api/auth/me` | Get logged-in user profile | Authenticated user |

### User Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/users` | Get all users | Admin |
| GET | `/api/users/:id` | Get single user | Admin |
| PATCH | `/api/users/:id` | Update user | Admin |
| PATCH | `/api/users/:id/disable` | Disable user | Admin |
| PATCH | `/api/users/:id/enable` | Enable user | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Department Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/departments` | Create department | Admin |
| GET | `/api/departments` | Get all departments | Authenticated user |
| GET | `/api/departments/:id` | Get single department | Authenticated user |
| PATCH | `/api/departments/:id` | Update department | Admin |
| DELETE | `/api/departments/:id` | Delete department | Admin |

### Doctor Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/doctors` | Create doctor profile | Admin |
| GET | `/api/doctors` | Get all doctors | Authenticated user |
| GET | `/api/doctors/:id` | Get single doctor | Authenticated user |
| PATCH | `/api/doctors/:id` | Update doctor profile | Admin |
| PATCH | `/api/doctors/:id/activate` | Activate doctor | Admin |
| PATCH | `/api/doctors/:id/deactivate` | Deactivate doctor | Admin |
| PATCH | `/api/doctors/:id/on-leave` | Mark doctor as on leave | Admin |
| DELETE | `/api/doctors/:id` | Delete doctor profile | Admin |

### Patient Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/patients` | Create patient | Admin, Receptionist |
| GET | `/api/patients` | Get all patients | Admin, Doctor, Nurse, Receptionist |
| GET | `/api/patients/me` | Get logged-in patient profile | Patient, Admin |
| GET | `/api/patients/:id` | Get single patient | Admin, Doctor, Nurse, Receptionist |
| PATCH | `/api/patients/:id` | Update patient | Admin, Receptionist |
| DELETE | `/api/patients/:id` | Delete patient | Admin |

### Appointment Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/appointments` | Book appointment | Admin, Receptionist, Patient |
| GET | `/api/appointments` | Get all appointments | Admin, Doctor, Nurse, Receptionist, Patient |
| GET | `/api/appointments/:id` | Get single appointment | Admin, Doctor, Nurse, Receptionist, Patient |
| PATCH | `/api/appointments/:id` | Update appointment | Admin, Receptionist |
| PATCH | `/api/appointments/:id/confirm` | Confirm appointment | Admin, Receptionist |
| PATCH | `/api/appointments/:id/cancel` | Cancel appointment | Admin, Receptionist, Patient |
| PATCH | `/api/appointments/:id/complete` | Complete appointment | Admin, Doctor |
| DELETE | `/api/appointments/:id` | Delete appointment | Admin |

### Consultation Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/consultations` | Create consultation | Admin, Doctor |
| GET | `/api/consultations` | Get all consultations | Admin, Doctor, Nurse |
| GET | `/api/consultations/patient/:patientId` | Get consultations by patient | Admin, Doctor, Nurse, Patient |
| GET | `/api/consultations/doctor/:doctorId` | Get consultations by doctor | Admin, Doctor |
| GET | `/api/consultations/:id` | Get single consultation | Admin, Doctor, Nurse, Patient |
| PATCH | `/api/consultations/:id` | Update consultation | Admin, Doctor |
| PATCH | `/api/consultations/:id/complete` | Complete consultation | Admin, Doctor |
| DELETE | `/api/consultations/:id` | Delete consultation | Admin, Doctor |

### Medical Record Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/medical-records` | Create medical record | Admin, Doctor |
| GET | `/api/medical-records` | Get all medical records | Admin, Doctor, Nurse |
| GET | `/api/medical-records/:id` | Get single medical record | Admin, Doctor, Nurse |

### Lab Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/labs/requests` | Create lab request | Admin, Doctor |
| GET | `/api/labs/requests` | Get all lab requests | Admin, Doctor, Lab Scientist |
| GET | `/api/labs/requests/:id` | Get single lab request | Admin, Doctor, Lab Scientist |
| PATCH | `/api/labs/requests/:id/status` | Update lab request status | Admin, Lab Scientist |
| POST | `/api/labs/results` | Upload lab result | Admin, Lab Scientist |
| GET | `/api/labs/results` | Get all lab results | Admin, Doctor, Lab Scientist |
| GET | `/api/labs/results/:id` | Get single lab result | Admin, Doctor, Lab Scientist |

### Prescription Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/prescriptions` | Create prescription | Admin, Doctor |
| GET | `/api/prescriptions` | Get all prescriptions | Admin, Doctor, Pharmacist |
| GET | `/api/prescriptions/:id` | Get single prescription | Authenticated user |
| PATCH | `/api/prescriptions/:id/status` | Update prescription status | Admin, Doctor, Pharmacist |

### Pharmacy Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/pharmacy/dispense` | Dispense prescription | Admin, Pharmacist |
| GET | `/api/pharmacy` | Get pharmacy records | Admin, Pharmacist, Doctor |
| GET | `/api/pharmacy/:id` | Get single pharmacy record | Admin, Pharmacist, Doctor |

### Billing Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/billing` | Create bill | Admin, Billing Officer |
| GET | `/api/billing` | Get all bills | Admin, Billing Officer |
| GET | `/api/billing/:id` | Get single bill | Admin, Billing Officer |
| PATCH | `/api/billing/:id/pay` | Mark bill as paid | Admin, Billing Officer |

## Postman Documentation

The Postman collection file is located at:

```bash
docs/postman_collection.json
```

Published Postman Documentation:

[View Published Postman Documentation](https://documenter.getpostman.com/view/40006004/2sBXwjxET2)

## Testing

Run tests with:

```bash
npm test
```

If Jest and Supertest are not installed yet, install them with:

```bash
npm install --save-dev jest supertest
```

## Git Workflow

The project uses the following branch structure:

```bash
main         = stable branch
development  = active development branch
feature/*    = feature/module branches
```

Contributors should create feature branches from `development` and open pull requests back into `development`.

## Submission Information

**Project Name:** Hospital Management System API

**Group:** Group 4

**Repository URL:**  
https://github.com/dasodhub/hospital-management-api

**Development Branch:** `development`

**Postman Collection:** `docs/postman_collection.json`

## Contributors

TS Academy Group 4 — Hospital Management System Team

- josey6kmt@gmail.com
- adegoke.lukmon@gmail.com
- atasiegloria@gmail.com
- maryammamcy@gmail.com
- johnoshoke64@gmail.com
- isiekwedaniel@gmail.com
- collinsobetta4@gmail.com

## License

ISC
