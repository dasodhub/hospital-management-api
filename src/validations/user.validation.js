const Joi = require('joi');

exports.updateUserSchema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),

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

    isActive: Joi.boolean().optional(),
    
});
