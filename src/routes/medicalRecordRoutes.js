const express = require("express");
const router = express.Router();

const { createMedicalRecordSchema } = require("../validations/medicalRecordValidation");
const validate = require("../middlewares/validate.middleware");

const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getPatientMedicalHistory,
  getDoctorDiagnosisRecords,
} = require("../controllers/medicalRecordController");


router.post("/", validate(createMedicalRecordSchema), createMedicalRecord);



router.get("/", getAllMedicalRecords);



router.get("/patient/:patientId", getPatientMedicalHistory);


router.get("/doctor/:doctorId", getDoctorDiagnosisRecords);

router.get("/:id", getMedicalRecordById);


module.exports = router;