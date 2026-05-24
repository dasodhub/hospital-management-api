const billingService = require("../services/billing.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.createBilling = asyncHandler(async (req, res) => {
  const billing = await billingService.createBilling(req.body);

  return successResponse(res, 201, "Bill created successfully", billing);
});

exports.getBillings = asyncHandler(async (req, res) => {
  const billings = await billingService.getBillings();

  return successResponse(res, 200, "Bills fetched successfully", billings);
});

exports.getBillingById = asyncHandler(async (req, res) => {
  const billing = await billingService.getBillingById(req.params.id);

  return successResponse(res, 200, "Bill fetched successfully", billing);
});

exports.markAsPaid = asyncHandler(async (req, res) => {
  const billing = await billingService.markAsPaid(
    req.params.id,
    req.body.paymentMethod
  );

  return successResponse(res, 200, "Bill marked as paid successfully", billing);
});
