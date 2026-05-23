const consultationService = require("../services/consultation.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");
const {
  createConsultationSchema,
  updateConsultationSchema,
} = require("../validations/consultation.validation");

exports.createConsultation = asyncHandler(async (req, res) => {
  const { error, value } = createConsultationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message).join(", "),
    });
  }

  const consultation = await consultationService.createConsultation(value);
  return successResponse(res, 201, "Consultation created successfully", consultation);
});

exports.getAllConsultations = asyncHandler(async (req, res) => {
  const consultations = await consultationService.getAllConsultations();
  return successResponse(res, 200, "Consultations retrieved successfully", consultations);
});

exports.getConsultationById = asyncHandler(async (req, res) => {
  const consultation = await consultationService.getConsultationById(req.params.id);
  return successResponse(res, 200, "Consultation retrieved successfully", consultation);
});

exports.getConsultationsByPatient = asyncHandler(async (req, res) => {
  const consultations = await consultationService.getConsultationsByPatient(req.params.patientId);
  return successResponse(res, 200, "Consultations retrieved successfully", consultations);
});

exports.getConsultationsByDoctor = asyncHandler(async (req, res) => {
  const consultations = await consultationService.getConsultationsByDoctor(req.params.doctorId);
  return successResponse(res, 200, "Consultations retrieved successfully", consultations);
});

exports.updateConsultation = asyncHandler(async (req, res) => {
  const { error, value } = updateConsultationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details.map((e) => e.message).join(", "),
    });
  }

  const consultation = await consultationService.updateConsultation(req.params.id, value);
  return successResponse(res, 200, "Consultation updated successfully", consultation);
});

exports.deleteConsultation = asyncHandler(async (req, res) => {
  await consultationService.deleteConsultation(req.params.id);
  return successResponse(res, 200, "Consultation deleted successfully");
});