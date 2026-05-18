const Joi = require("joi");

exports.createDepartmentSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    "any.required": "Department name is required",
    "string.min": "Department name must be at least 3 characters",
  }),

  description: Joi.string().min(10).max(500).required().messages({
    "any.required": "Department description is required",
    "string.min": "Description must be at least 10 characters",
  }),

  status: Joi.string().valid("active", "inactive").optional(),

  head: Joi.string().optional(),
});

exports.updateDepartmentSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(500).optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  head: Joi.string().optional(),
});