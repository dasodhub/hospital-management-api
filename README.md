# Hospital Management System API

A RESTful Hospital Management System API built with Node.js, Express.js, and MongoDB.

## Project Overview

This project is a backend system developed for the TS Academy Backend Development Capstone Project.

The system helps manage:
•⁠  ⁠Patients
•⁠  ⁠Doctors
•⁠  ⁠Departments
•⁠  ⁠Appointments
•⁠  ⁠Medical Records
•⁠  ⁠Prescriptions
•⁠  ⁠Billing & Payments

## Features

•⁠  ⁠JWT Authentication
•⁠  ⁠Role-Based Access Control
•⁠  ⁠CRUD Operations
•⁠  ⁠Appointment Scheduling
•⁠  ⁠Medical Records Management
•⁠  ⁠Prescription Management
•⁠  ⁠Billing System
•⁠  ⁠Centralized Error Handling
•⁠  ⁠Request Validation
•⁠  ⁠API Documentation

## Tech Stack

•⁠  ⁠Node.js
•⁠  ⁠Express.js
•⁠  ⁠MongoDB
•⁠  ⁠Mongoose
•⁠  ⁠JWT
•⁠  ⁠bcryptjs

## Folder Structure

src/ 
    ├── config
    ├── controllers
    ├── middlewares
    ├── models
    ├── routes
    ├── services
    ├── utils
    ├── validations
    └── app.js 

## Installation

git clone https://github.com/dasodhub/hospital-management-api.git
cd hospital-management-api
npm install 

## Environment Variables

Create a .env file and add:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d 

## Running the Project

Development:

npm run dev 

Production:

npm start 

## API Base URL

/api 

## API Endpoints 
## Auth & User API Endpoints

### Auth Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user and return JWT token | Public |
| GET | `/api/auth/me` | Get logged-in user profile | Authenticated user |

### User Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/users` | Get all users | Admin only |
| GET | `/api/users/:id` | Get single user by ID | Admin only |
| PATCH | `/api/users/:id` | Update user details | Admin only |
| PATCH | `/api/users/:id/disable` | Disable user account | Admin only |
| PATCH | `/api/users/:id/enable` | Enable user account | Admin only |
| DELETE | `/api/users/:id` | Delete user account | Admin only |

## Team Workflow

•⁠  ⁠main → stable branch
•⁠  ⁠develop → active development branch
•⁠  ⁠feature/* → module branches

## Contributors

TS Academy Group 4 — Hospital Management System Team

## License

MIT