const Joi = require("joi");

exports.createLabRequestSchema = Joi.object({
  patient: Joi.string().required(),
  doctor: Joi.string().required(),
  consultation: Joi.string().optional(),
  testName: Joi.string().required(),
  testType: Joi.string().optional(),
  reason: Joi.string().optional(),
});

exports.createLabResultSchema = Joi.object({
  labRequest: Joi.string().required(),
  patient: Joi.string().required(),
  result: Joi.string().required(),
  comment: Joi.string().optional(),
  resultFile: Joi.string().optional(),
});

exports.updateLabRequestStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "in_progress", "completed", "cancelled")
    .required(),
});
