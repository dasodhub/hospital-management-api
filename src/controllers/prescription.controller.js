const prescriptionService = require("../services/prescription.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.createPrescription = asyncHandler(async (req, res) => {
  const prescription = await prescriptionService.createPrescription(req.body);

  return successResponse(
    res,
    201,
    "Prescription created successfully",
    prescription
  );
});

exports.getPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await prescriptionService.getPrescriptions();

  return successResponse(
    res,
    200,
    "Prescriptions fetched successfully",
    prescriptions
  );
});

exports.getPrescriptionById = asyncHandler(async (req, res) => {
  const prescription = await prescriptionService.getPrescriptionById(
    req.params.id
  );

  return successResponse(
    res,
    200,
    "Prescription fetched successfully",
    prescription
  );
});

exports.updatePrescriptionStatus = asyncHandler(async (req, res) => {
  const prescription = await prescriptionService.updatePrescriptionStatus(
    req.params.id,
    req.body.status
  );

  return successResponse(
    res,
    200,
    "Prescription status updated successfully",
    prescription
  );
});
