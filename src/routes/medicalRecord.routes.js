const router = require("express").Router();

const medicalRecordController = require("../controllers/medicalRecord.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createMedicalRecordSchema,
} = require("../validations/medicalRecord.validation");

router.post(
  "/",
  auth,
  allowRoles("admin", "doctor"),
  validate(createMedicalRecordSchema),
  medicalRecordController.createMedicalRecord
);

router.get(
  "/",
  auth,
  allowRoles("admin", "doctor", "nurse"),
  medicalRecordController.getMedicalRecords
);

router.get(
  "/:id",
  auth,
  allowRoles("admin", "doctor", "nurse"),
  medicalRecordController.getMedicalRecordById
);

module.exports = router;
