const router = require("express").Router();


router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));


router.use("/patients", require("./patient.routes"));
router.use("/departments", require("./department.routes"));
router.use("/doctors", require("./doctor.routes"));
router.use("/labs", require("./lab.routes"));
router.use("/prescriptions", require("./prescription.routes"));
router.use("/pharmacy", require("./pharmacy.routes"));









module.exports = router;