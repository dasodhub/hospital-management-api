const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  cancelPrescription,
  deletePrescription,
  getPatientPrescriptions,
  getPrescriptionStats,
} = require("../controllers/prescriptionController");

const { protect, authorize } = require("../middlewares/authMiddleware");
const { validatePrescription } = require("../middlewares/prescriptionValidator");

// All routes are protected
router.use(protect);

// GET all / POST new
router
  .route("/")
  .get(getPrescriptions)
  .post(authorize("doctor", "admin"), validatePrescription, createPrescription);

// GET stats — admin only
router.get("/stats", authorize("admin"), getPrescriptionStats);

// GET prescriptions for a specific patient
router.get("/patient/:patientId", authorize("doctor", "admin"), getPatientPrescriptions);

// GET / PUT / DELETE single prescription
router
  .route("/:id")
  .get(getPrescriptionById)
  .put(authorize("doctor", "admin"), updatePrescription)
  .delete(authorize("admin"), deletePrescription);

// PATCH — cancel a prescription (soft delete)
router.patch("/:id/cancel", authorize("doctor", "admin"), cancelPrescription);

module.exports = router;
