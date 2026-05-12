const router = require("express").Router();

// ─── Auth and User Routes ─────────────────────────────
// Will be uncommented when Auth team pushes their code
// router.use("/auth", require("./auth.routes"));
// router.use("/users", require("./user.routes"));

// ─── Patient Routes ───────────────────────────────────
router.use("/patients", require("./patient.routes"));

// ─── Other Routes ─────────────────────────────────────
// Will be uncommented as other teams push their code
// router.use("/doctors", require("./doctor.routes"));
// router.use("/departments", require("./department.routes"));
// router.use("/appointments", require("./appointment.routes"));
// router.use("/medical-records", require("./medicalRecord.routes"));
// router.use("/prescriptions", require("./prescription.routes"));
// router.use("/billings", require("./billing.routes"));

module.exports = router;