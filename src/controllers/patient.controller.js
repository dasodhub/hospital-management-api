const patientService = require("../services/patient.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const {
  createPatientSchema,
  updatePatientSchema,
} = require("../validations/patient.validation");


exports.createPatient = asyncHandler(async (req, res) => {
  const { error, value } = createPatientSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return errorResponse(res, 400, error.details.map((e) => e.message).join(", "));
  }

  const patient = await patientService.createPatient(req.user._id, value);
  return successResponse(res, 201, "Patient created successfully", patient);
});


exports.getAllPatients = asyncHandler(async (req, res) => {
  const patients = await patientService.getAllPatients();
  return successResponse(res, 200, "Patients retrieved successfully", patients);
});


exports.getPatientById = asyncHandler(async (req, res) => {
  const patient = await patientService.getPatientById(req.params.id);
  return successResponse(res, 200, "Patient retrieved successfully", patient);
});


exports.getMyProfile = asyncHandler(async (req, res) => {
  const patient = await patientService.getPatientByUserId(req.user._id);
  return successResponse(res, 200, "Patient profile retrieved successfully", patient);
});


exports.updatePatient = asyncHandler(async (req, res) => {
  const { error, value } = updatePatientSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return errorResponse(res, 400, error.details.map((e) => e.message).join(", "));
  }

  const patient = await patientService.updatePatient(req.params.id, value);
  return successResponse(res, 200, "Patient updated successfully", patient);
});


exports.deletePatient = asyncHandler(async (req, res) => {
  await patientService.deletePatient(req.params.id);
  return successResponse(res, 200, "Patient deleted successfully");
});