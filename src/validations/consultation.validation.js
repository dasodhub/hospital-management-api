const Joi = require("joi");

exports.createConsultationSchema = Joi.object({
  appointment: Joi.string().required().messages({
    "any.required": "Appointment ID is required",
  }),

  patient: Joi.string().required().messages({
    "any.required": "Patient ID is required",
  }),

  doctor: Joi.string().required().messages({
    "any.required": "Doctor ID is required",
  }),

  symptoms: Joi.array().items(Joi.string()).optional(),

  diagnosis: Joi.string().optional(),

  notes: Joi.string().optional(),

  treatmentPlan: Joi.string().optional(),

  status: Joi.string()
    .valid("ongoing", "completed", "cancelled")
    .optional(),
});

exports.updateConsultationSchema = Joi.object({
  symptoms: Joi.array().items(Joi.string()).optional(),
  diagnosis: Joi.string().optional(),
  notes: Joi.string().optional(),
  treatmentPlan: Joi.string().optional(),
  status: Joi.string()
    .valid("ongoing", "completed", "cancelled")
    .optional(),
});