const Joi = require("joi");

exports.dispensePrescriptionSchema = Joi.object({
  prescription: Joi.string().required(),
  patient: Joi.string().required(),
  drugsDispensed: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
        note: Joi.string().optional(),
      })
    )
    .min(1)
    .required(),
  status: Joi.string()
    .valid("dispensed", "partially_dispensed", "cancelled")
    .optional(),
});
