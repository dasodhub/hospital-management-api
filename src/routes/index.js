const router = require("express").Router();


router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));


router.use("/patients", require("./patient.routes"));
router.use("/departments", require("./department.routes"));
router.use("/doctors", require("./doctor.routes"));










module.exports = router;