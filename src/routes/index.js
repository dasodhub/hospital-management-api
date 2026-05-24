const router = require("express").Router();

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/patients", require("./patient.routes"));
router.use("/departments", require("./department.routes"));
router.use("/doctors", require("./doctor.routes"));
router.use("/appointments", require("./appointment.routes"));
router.use("/consultations", require("./consultation.routes"));
router.use("/medical-records", require("./medicalRecord.routes"));
router.use("/labs", require("./lab.routes"));
router.use("/prescriptions", require("./prescription.routes"));
router.use("/pharmacy", require("./pharmacy.routes"));
router.use("/billing", require("./billing.routes"));

module.exports = router;
