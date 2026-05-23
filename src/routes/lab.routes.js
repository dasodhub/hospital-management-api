const router = require("express").Router();

const labController = require("../controllers/lab.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createLabRequestSchema,
  createLabResultSchema,
  updateLabRequestStatusSchema,
} = require("../validations/lab.validation");

router.post(
  "/requests",
  auth,
  allowRoles("admin", "doctor"),
  validate(createLabRequestSchema),
  labController.createLabRequest
);

router.get(
  "/requests",
  auth,
  allowRoles("admin", "doctor", "lab_scientist"),
  labController.getLabRequests
);

router.get(
  "/requests/:id",
  auth,
  allowRoles("admin", "doctor", "lab_scientist"),
  labController.getLabRequestById
);

router.patch(
  "/requests/:id/status",
  auth,
  allowRoles("admin", "lab_scientist"),
  validate(updateLabRequestStatusSchema),
  labController.updateLabRequestStatus
);

router.post(
  "/results",
  auth,
  allowRoles("admin", "lab_scientist"),
  validate(createLabResultSchema),
  labController.createLabResult
);

router.get(
  "/results",
  auth,
  allowRoles("admin", "doctor", "lab_scientist"),
  labController.getLabResults
);

router.get(
  "/results/:id",
  auth,
  allowRoles("admin", "doctor", "lab_scientist"),
  labController.getLabResultById
);

module.exports = router;
