const Department = require("../models/Department");

exports.createDepartment = async (data) => {
  
  const existing = await Department.findOne({ name: data.name });
  if (existing) {
    const error = new Error("Department with this name already exists");
    error.statusCode = 400;
    throw error;
  }

  const department = await Department.create(data);
  return department;
};

exports.getAllDepartments = async () => {
  const departments = await Department.find()
    .populate("head", "fullName email role")
    .sort({ createdAt: -1 });
  return departments;
};

exports.getDepartmentById = async (id) => {
  const department = await Department.findById(id)
    .populate("head", "fullName email role");

  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return department;
};

exports.updateDepartment = async (id, data) => {
  const department = await Department.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  ).populate("head", "fullName email role");

  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return department;
};

exports.deleteDepartment = async (id) => {
  const department = await Department.findByIdAndDelete(id);

  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return department;
};

exports.updateDepartmentStatus = async (id, status) => {
  const department = await Department.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!department) {
    const error = new Error("Department not found");
    error.statusCode = 404;
    throw error;
  }

  return department;
};