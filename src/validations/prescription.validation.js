const Joi = require("joi");

exports.createPrescriptionSchema = Joi.object({
  patient: Joi.string().required(),
  doctor: Joi.string().required(),
  consultation: Joi.string().optional(),
  medications: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        dosage: Joi.string().optional(),
        frequency: Joi.string().optional(),
        duration: Joi.string().optional(),
        instruction: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
  instructions: Joi.string().optional(),
});

exports.updatePrescriptionStatusSchema = Joi.object({
  status: Joi.string().valid("pending", "dispensed", "cancelled").required(),
});
