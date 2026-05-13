const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patient.controller");


const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");




router.post("/", authMiddleware, allowRoles("admin", "receptionist"), patientController.createPatient);


router.get("/", authMiddleware, allowRoles("admin", "doctor", "nurse", "receptionist"), patientController.getAllPatients);


router.get("/me", authMiddleware, allowRoles("patient", "admin"), patientController.getMyProfile);


router.get("/:id", authMiddleware, allowRoles("admin", "doctor", "nurse", "receptionist"), patientController.getPatientById);


router.patch("/:id", authMiddleware, allowRoles("admin", "receptionist"), patientController.updatePatient);


router.delete("/:id", authMiddleware, allowRoles("admin"), patientController.deletePatient);

module.exports = router;