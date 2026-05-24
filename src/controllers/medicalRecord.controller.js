const medicalRecordService = require("../services/medicalRecord.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.createMedicalRecord = asyncHandler(async (req, res) => {
  const record = await medicalRecordService.createMedicalRecord(req.body);

  return successResponse(
    res,
    201,
    "Medical record created successfully",
    record
  );
});

exports.getMedicalRecords = asyncHandler(async (req, res) => {
  const records = await medicalRecordService.getMedicalRecords();

  return successResponse(
    res,
    200,
    "Medical records fetched successfully",
    records
  );
});

exports.getMedicalRecordById = asyncHandler(async (req, res) => {
  const record = await medicalRecordService.getMedicalRecordById(req.params.id);

  return successResponse(
    res,
    200,
    "Medical record fetched successfully",
    record
  );
});
