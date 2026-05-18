const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/department.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");


router.post(
  "/",
  authMiddleware,
  allowRoles("admin"),
  departmentController.createDepartment
);

router.get(
  "/",
  authMiddleware,
  allowRoles("admin", "doctor", "nurse", "receptionist"),
  departmentController.getAllDepartments
);

router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles("admin"),
  departmentController.updateDepartmentStatus
);

router.get(
  "/:id",
  authMiddleware,
  allowRoles("admin", "doctor", "nurse", "receptionist"),
  departmentController.getDepartmentById
);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  departmentController.updateDepartment
);

router.delete(
  "/:id",
  authMiddleware,
  allowRoles("admin"),
  departmentController.deleteDepartment
);

module.exports = router;