const router = require("express").Router();

const pharmacyController = require("../controllers/pharmacy.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  dispensePrescriptionSchema,
} = require("../validations/pharmacy.validation");

router.post(
  "/dispense",
  auth,
  allowRoles("admin", "pharmacist"),
  validate(dispensePrescriptionSchema),
  pharmacyController.dispensePrescription
);

router.get(
  "/",
  auth,
  allowRoles("admin", "pharmacist", "doctor"),
  pharmacyController.getPharmacyRecords
);

router.get(
  "/:id",
  auth,
  allowRoles("admin", "pharmacist", "doctor"),
  pharmacyController.getPharmacyRecordById
);

module.exports = router;
