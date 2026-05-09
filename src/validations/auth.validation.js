const Joi = require('joi');

exports.registerSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),

    email: Joi.string().email().required(),

    password: Joi.string().min(6).required(),

    phone: Joi.string().pattern(/^[0-9]{10,15}$/).required(),

    role: Joi.string().valid(
        "admin",
        "doctor",
        "nurse",
        "receptionist",
        "lab_scientist",
        "pharmacist",
        "billing_officer",
        "patient"
    ).optional(),
});


exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),

    password: Joi.string().required(),
});
