const departmentService = require("../services/department.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");
const {
  createDepartmentSchema,
  updateDepartmentSchema,
} = require("../validations/department.validation");

exports.createDepartment = asyncHandler(async (req, res) => {
 
  const { error, value } = createDepartmentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message).join(", "),
    });
  }

  const department = await departmentService.createDepartment(value);
  return successResponse(res, 201, "Department created successfully", department);
});

exports.getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await departmentService.getAllDepartments();
  return successResponse(res, 200, "Departments retrieved successfully", departments);
});

exports.getDepartmentById = asyncHandler(async (req, res) => {
  const department = await departmentService.getDepartmentById(req.params.id);
  return successResponse(res, 200, "Department retrieved successfully", department);
});


exports.updateDepartment = asyncHandler(async (req, res) => {
  
  const { error, value } = updateDepartmentSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message).join(", "),
    });
  }

  const department = await departmentService.updateDepartment(req.params.id, value);
  return successResponse(res, 200, "Department updated successfully", department);
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  await departmentService.deleteDepartment(req.params.id);
  return successResponse(res, 200, "Department deleted successfully");
});


exports.updateDepartmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!status || !["active", "inactive"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Status must be either active or inactive",
    });
  }

  const department = await departmentService.updateDepartmentStatus(
    req.params.id,
    status
  );
  return successResponse(res, 200, "Department status updated successfully", department);
});