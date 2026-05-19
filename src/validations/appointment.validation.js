const Joi = require("joi");

const createAppointmentValidation = (data) => {
  const schema = Joi.object({
    patient: Joi.string().required(),

    doctor: Joi.string().required(),

    appointmentDate: Joi.date().required(),

    reason: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};

module.exports = {
  createAppointmentValidation,
};