const Joi = require("joi");

exports.createMedicalRecordSchema = Joi.object({
  patient: Joi.string().required(),
  doctor: Joi.string().required(),
  consultation: Joi.string().optional(),
  diagnosis: Joi.string().required(),
  treatment: Joi.string().optional(),
  notes: Joi.string().optional(),
});
