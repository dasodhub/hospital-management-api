
const router = require("express").Router();

const appointmentController = require("../controllers/appointment.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createAppointmentSchema,
  updateAppointmentSchema,
} = require("../validations/appointment.validation");

router.post(
  "/",
  auth,
  allowRoles("admin", "receptionist", "patient"),
  validate(createAppointmentSchema),
  appointmentController.bookAppointment
);

router.get(
  "/",
  auth,
  allowRoles("admin", "doctor", "nurse", "receptionist", "patient"),
  appointmentController.getAppointments
);

router.get(
  "/:id",
  auth,
  allowRoles("admin", "doctor", "nurse", "receptionist", "patient"),
  appointmentController.getAppointmentById
);

router.patch(
  "/:id",
  auth,
  allowRoles("admin", "receptionist"),
  validate(updateAppointmentSchema),
  appointmentController.updateAppointment
);

router.patch(
  "/:id/confirm",
  auth,
  allowRoles("admin", "receptionist"),
  appointmentController.confirmAppointment
);

router.patch(
  "/:id/cancel",
  auth,
  allowRoles("admin", "receptionist", "patient"),
  appointmentController.cancelAppointment
);

router.patch(
  "/:id/complete",
  auth,
  allowRoles("admin", "doctor"),
  appointmentController.completeAppointment
);

router.delete(
  "/:id",
  auth,
  allowRoles("admin"),
  appointmentController.deleteAppointment
);

module.exports = router;