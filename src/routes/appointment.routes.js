const express = require("express");

const {
  bookAppointment,
  getAppointments,
  getSingleAppointment,
  confirmAppointment,
  completeAppointment,
  checkDoctorAvailability,
} = require("../controllers/appointment.controller");

const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");


router.post("/book", authMiddleware, allowRoles(["patient"]), bookAppointment);

router.get("/", authMiddleware, allowRoles(["patient", "doctor"]), getAppointments);

router.get("/single/:id", authMiddleware, allowRoles(["patient", "doctor"]), getSingleAppointment);

router.patch("/confirm/:id", authMiddleware, allowRoles(["doctor"]), confirmAppointment);

router.patch("/complete/:id", authMiddleware, allowRoles(["doctor"]), completeAppointment);

router.get("/availability", authMiddleware, allowRoles(["patient"]), checkDoctorAvailability);

module.exports = router;