const pharmacyService = require("../services/pharmacy.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.dispensePrescription = asyncHandler(async (req, res) => {
  const pharmacyRecord = await pharmacyService.dispensePrescription(
    req.body,
    req.user._id
  );

  return successResponse(
    res,
    201,
    "Prescription dispensed successfully",
    pharmacyRecord
  );
});

exports.getPharmacyRecords = asyncHandler(async (req, res) => {
  const records = await pharmacyService.getPharmacyRecords();

  return successResponse(
    res,
    200,
    "Pharmacy records fetched successfully",
    records
  );
});

exports.getPharmacyRecordById = asyncHandler(async (req, res) => {
  const record = await pharmacyService.getPharmacyRecordById(req.params.id);

  return successResponse(
    res,
    200,
    "Pharmacy record fetched successfully",
    record
  );
});
