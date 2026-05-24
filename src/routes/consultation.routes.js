const express = require("express");
const router = express.Router();
const consultationController = require("../controllers/consultation.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.post(
  "/",
  authMiddleware,
  allowRoles("admin", "doctor"),
  consultationController.createConsultation
);

router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "doctor", "nurse"),
  consultationController.getAllConsultations
);

router.get(
  "/patient/:patientId",
  authMiddleware,
  allowRoles("admin", "doctor", "nurse", "patient"),
  consultationController.getConsultationsByPatient
);

router.get(
  "/doctor/:doctorId",
  authMiddleware,
  allowRoles("admin", "doctor"),
  consultationController.getConsultationsByDoctor
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("admin", "doctor", "nurse", "patient"),
  consultationController.getConsultationById
);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("admin", "doctor"),
  consultationController.updateConsultation
);

router.patch(
  "/:id/complete",
  authMiddleware,
  allowRoles("admin", "doctor"),
  consultationController.completeConsultation
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin", "doctor"),
  consultationController.deleteConsultation
);

module.exports = router;
