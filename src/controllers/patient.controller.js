const patientService = require("../services/patient.service");
const { createPatientSchema, updatePatientSchema } = require("../validations/patient.validation");

// ─── Create Patient ───────────────────────────────────
const createPatient = async (req, res) => {
  try {
    const { error, value } = createPatientSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const patient = await patientService.createPatient(req.user._id, value);

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient,
    });

  } catch (error) {
    console.error("Create patient error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Could not create patient",
    });
  }
};

// ─── Get All Patients ─────────────────────────────────
const getAllPatients = async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();

    res.status(200).json({
      success: true,
      message: "Patients retrieved successfully",
      count: patients.length,
      data: patients,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not get patients",
    });
  }
};

// ─── Get Single Patient ───────────────────────────────
const getPatientById = async (req, res) => {
  try {
    const patient = await patientService.getPatientById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient retrieved successfully",
      data: patient,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Patient not found",
    });
  }
};

// ─── Get My Patient Profile ───────────────────────────
const getMyProfile = async (req, res) => {
  try {
    const patient = await patientService.getPatientByUserId(req.user._id);

    res.status(200).json({
      success: true,
      message: "Patient profile retrieved successfully",
      data: patient,
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message || "Patient profile not found",
    });
  }
};

// ─── Update Patient ───────────────────────────────────
const updatePatient = async (req, res) => {
  try {
    const { error, value } = updatePatientSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details.map((err) => err.message),
      });
    }

    const patient = await patientService.updatePatient(req.params.id, value);

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not update patient",
    });
  }
};

// ─── Delete Patient ───────────────────────────────────
const deletePatient = async (req, res) => {
  try {
    await patientService.deletePatient(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Could not delete patient",
    });
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getMyProfile,
  updatePatient,
  deletePatient,
};