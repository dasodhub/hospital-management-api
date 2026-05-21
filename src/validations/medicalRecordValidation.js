const Joi = require("joi");


const createMedicalRecordSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  consultationId: Joi.string().required(),

  symptoms: Joi.string().min(3).required(),
  diagnosis: Joi.string().min(3).required(),
  treatment: Joi.string().min(3).required(),

  notes: Joi.string().allow("").optional(),
});

module.exports = {
  createMedicalRecordSchema,
};