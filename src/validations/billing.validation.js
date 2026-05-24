const Joi = require("joi");

exports.createBillingSchema = Joi.object({
  patient: Joi.string().required(),
  appointment: Joi.string().optional(),
  consultation: Joi.string().optional(),
  items: Joi.array()
    .items(
      Joi.object({
        title: Joi.string().required(),
        amount: Joi.number().min(0).required(),
      })
    )
    .min(1)
    .required(),
});

exports.payBillingSchema = Joi.object({
  paymentMethod: Joi.string()
    .valid("cash", "card", "transfer", "insurance")
    .required(),
});
