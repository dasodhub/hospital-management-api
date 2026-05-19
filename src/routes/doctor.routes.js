const router = require("express").Router();

const doctorController = require("../controllers/doctor.controller");
const auth = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const validate = require("../middlewares/validate.middleware");

const {
    createDoctorSchema,
    updateDoctorSchema,
} = require("../validations/doctor.validation");

router.post(
    "/",
    auth,
    allowRoles("admin"),
    validate(createDoctorSchema),
    doctorController.createDoctor
);

router.get(
    "/",
    auth,
    allowRoles("admin", "doctor", "nurse", "receptionist", "patient"),
    doctorController.getDoctors
);

router.get(
    "/:id",
    auth,
    allowRoles("admin", "doctor", "nurse", "receptionist", "patient"),
    doctorController.getDoctorById
);

router.patch(
    "/:id",
    auth,
    allowRoles("admin"),
    validate(updateDoctorSchema),
    doctorController.updateDoctor
);

router.patch(
    "/:id/activate",
    auth,
    allowRoles("admin"),
    doctorController.activateDoctor
);

router.patch(
    "/:id/deactivate",
    auth,
    allowRoles("admin"),
    doctorController.deactivateDoctor
);

router.patch(
    "/:id/on-leave",
    auth,
    allowRoles("admin"),
    doctorController.markDoctorOnLeave
);

router.delete(
    "/:id",
    auth,
    allowRoles("admin"),
    doctorController.deleteDoctor
);

module.exports = router;
