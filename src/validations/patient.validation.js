const Joi = require("joi");

// ─── Create Patient Validation ────────────────────────
const createPatientSchema = Joi.object({
  gender: Joi.string()
    .valid("male", "female", "other")
    .required()
    .messages({
      "any.required": "Gender is required",
      "any.only": "Gender must be male, female or other",
    }),

  dateOfBirth: Joi.date()
    .required()
    .messages({
      "any.required": "Date of birth is required",
    }),

  phone: Joi.string()
    .required()
    .messages({
      "any.required": "Phone number is required",
    }),

  address: Joi.string()
    .required()
    .messages({
      "any.required": "Address is required",
    }),

  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
    .required()
    .messages({
      "any.required": "Blood group is required",
      "any.only": "Invalid blood group",
    }),

  genotype: Joi.string()
    .valid("AA", "AS", "SS", "AC")
    .required()
    .messages({
      "any.required": "Genotype is required",
      "any.only": "Genotype must be AA, AS, SS or AC",
    }),

  emergencyContact: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Emergency contact name is required",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Emergency contact phone is required",
    }),
    relationship: Joi.string().required().messages({
      "any.required": "Emergency contact relationship is required",
    }),
  }).required(),

  allergies: Joi.array().items(Joi.string()).default([]),
});

// ─── Update Patient Validation ────────────────────────
const updatePatientSchema = Joi.object({
  gender: Joi.string().valid("male", "female", "other"),
  dateOfBirth: Joi.date(),
  phone: Joi.string(),
  address: Joi.string(),
  bloodGroup: Joi.string().valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"),
  genotype: Joi.string().valid("AA", "AS", "SS", "AC"),
  emergencyContact: Joi.object({
    name: Joi.string(),
    phone: Joi.string(),
    relationship: Joi.string(),
  }),
  allergies: Joi.array().items(Joi.string()),
});

module.exports = { createPatientSchema, updatePatientSchema };