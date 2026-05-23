const labService = require("../services/lab.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.createLabRequest = asyncHandler(async (req, res) => {
  const labRequest = await labService.createLabRequest(req.body);

  return successResponse(
    res,
    201,
    "Lab request created successfully",
    labRequest
  );
});

exports.getLabRequests = asyncHandler(async (req, res) => {
  const labRequests = await labService.getLabRequests();

  return successResponse(
    res,
    200,
    "Lab requests fetched successfully",
    labRequests
  );
});

exports.getLabRequestById = asyncHandler(async (req, res) => {
  const labRequest = await labService.getLabRequestById(req.params.id);

  return successResponse(
    res,
    200,
    "Lab request fetched successfully",
    labRequest
  );
});

exports.updateLabRequestStatus = asyncHandler(async (req, res) => {
  const labRequest = await labService.updateLabRequestStatus(
    req.params.id,
    req.body.status
  );

  return successResponse(
    res,
    200,
    "Lab request status updated successfully",
    labRequest
  );
});

exports.createLabResult = asyncHandler(async (req, res) => {
  const labResult = await labService.createLabResult(req.body, req.user._id);

  return successResponse(
    res,
    201,
    "Lab result uploaded successfully",
    labResult
  );
});

exports.getLabResults = asyncHandler(async (req, res) => {
  const labResults = await labService.getLabResults();

  return successResponse(
    res,
    200,
    "Lab results fetched successfully",
    labResults
  );
});

exports.getLabResultById = asyncHandler(async (req, res) => {
  const labResult = await labService.getLabResultById(req.params.id);

  return successResponse(
    res,
    200,
    "Lab result fetched successfully",
    labResult
  );
});
