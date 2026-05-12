const express = require("express");
const router = express.Router();
const {
  createPatient,
  getAllPatients,
  getPatientById,
  getMyProfile,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

// ─── Auth Middleware ──────────────────────────────────
// We import this from the Auth module
// It will be available once Auth team pushes their code
const protect = require("../middlewares/auth.middleware");
const roleGuard = require("../middlewares/role.middleware");

// ─── Patient Routes ───────────────────────────────────

// POST /api/patients - Create a new patient
// Only admin and receptionist can create patients
router.post(
  "/",
  protect,
  roleGuard("admin", "receptionist"),
  createPatient
);

// GET /api/patients - Get all patients
// Admin, doctor, nurse and receptionist can view all patients
router.get(
  "/",
  protect,
  roleGuard("admin", "doctor", "nurse", "receptionist"),
  getAllPatients
);

// GET /api/patients/me - Get my own patient profile
// Only the logged in patient can view their own profile
router.get(
  "/me",
  protect,
  roleGuard("patient"),
  getMyProfile
);

// GET /api/patients/:id - Get single patient by ID
// Admin, doctor, nurse and receptionist can view a patient
router.get(
  "/:id",
  protect,
  roleGuard("admin", "doctor", "nurse", "receptionist"),
  getPatientById
);

// PATCH /api/patients/:id - Update patient
// Only admin and receptionist can update patients
router.patch(
  "/:id",
  protect,
  roleGuard("admin", "receptionist"),
  updatePatient
);

// DELETE /api/patients/:id - Delete patient
// Only admin can delete patients
router.delete(
  "/:id",
  protect,
  roleGuard("admin"),
  deletePatient
);

module.exports = router;