
const Joi = require("joi");

exports.createAppointmentSchema = Joi.object({
  patient: Joi.string().required(),

  doctor: Joi.string().required(),

  appointmentDate: Joi.date().required(),

  appointmentTime: Joi.string().required(),

  reason: Joi.string().optional(),
});

exports.updateAppointmentSchema = Joi.object({
  appointmentDate: Joi.date().optional(),

  appointmentTime: Joi.string().optional(),

  reason: Joi.string().optional(),

  status: Joi.string()
    .valid("pending", "confirmed", "cancelled", "completed")
    .optional(),
});