const router = require("express").Router();

const prescriptionController = require("../controllers/prescription.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createPrescriptionSchema,
  updatePrescriptionStatusSchema,
} = require("../validations/prescription.validation");

router.post(
  "/",
  auth,
  allowRoles("admin", "doctor"),
  validate(createPrescriptionSchema),
  prescriptionController.createPrescription
);

router.get(
  "/",
  auth,
  allowRoles("admin", "doctor", "pharmacist"),
  prescriptionController.getPrescriptions
);

router.get("/:id", auth, prescriptionController.getPrescriptionById);

router.patch(
  "/:id/status",
  auth,
  allowRoles("admin", "doctor", "pharmacist"),
  validate(updatePrescriptionStatusSchema),
  prescriptionController.updatePrescriptionStatus
);

module.exports = router;
