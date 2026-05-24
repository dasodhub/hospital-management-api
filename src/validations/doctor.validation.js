const Joi = require('joi');

exports.createDoctorSchema = Joi.object({
    user: Joi.string().required(),

    department: Joi.string().required(),

    specialization: Joi.string().required(),

    qualification: Joi.string().optional(),

    yearsOfExperience: Joi.number().min(0).optional(),

    availableDays: Joi.array().items(
        Joi.string().valid(
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        )
    ),

    availableTimes: Joi.array().items(Joi.string()).optional(),
    
    consultationFee: Joi.number().min(0).optional(),

    status: Joi.string().valid("active", "inactive", "on_leave").optional(),
});


exports.updateDoctorSchema = Joi.object({
    department: Joi.string().optional(),

    specialization: Joi.string().optional(),

    qualification: Joi.string().optional(),

    yearsOfExperience: Joi.number().min(0).optional(),

    availableDays: Joi.array().items(
        Joi.string().valid(
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
        )
    ).optional(),

    availableTimes: Joi.array().items(Joi.string()).optional(),

    consultationFee: Joi.number().min(0).optional(),

    status: Joi.string().valid("active", "inactive", "on_leave").optional(),
});