const { body, validationResult } = require("express-validator");

const validatePrescription = [
  body("patient")
    .notEmpty()
    .withMessage("Patient ID is required")
    .isMongoId()
    .withMessage("Invalid patient ID"),

  body("diagnosis")
    .notEmpty()
    .withMessage("Diagnosis is required")
    .isLength({ min: 3 })
    .withMessage("Diagnosis must be at least 3 characters"),

  body("medications")
    .isArray({ min: 1 })
    .withMessage("At least one medication is required"),

  body("medications.*.medicationName")
    .notEmpty()
    .withMessage("Medication name is required"),

  body("medications.*.dosage")
    .notEmpty()
    .withMessage("Dosage is required"),

  body("medications.*.frequency")
    .notEmpty()
    .withMessage("Frequency is required")
    .isIn(["once daily", "twice daily", "three times daily", "four times daily", "as needed"])
    .withMessage("Invalid frequency value"),

  body("medications.*.duration")
    .notEmpty()
    .withMessage("Duration is required"),

  body("expiresAt")
    .optional()
    .isISO8601()
    .withMessage("Invalid expiry date format"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map((err) => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];

module.exports = { validatePrescription };
