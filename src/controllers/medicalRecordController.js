const MedicalRecord = require("../models/MedicalRecord");

// CREATE MEDICAL RECORD
const createMedicalRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.create(req.body);

    res.status(201).json({
      success: true,
      message: "Medical record created successfully",
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MEDICAL RECORDS
const getAllMedicalRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate("patientId")
      .populate("doctorId")
      .populate("consultationId");

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET SINGLE MEDICAL RECORD
const getMedicalRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate("patientId")
      .populate("doctorId")
      .populate("consultationId");

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PATIENT MEDICAL HISTORY
const getPatientMedicalHistory = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      patientId: req.params.patientId,
    });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET DOCTOR DIAGNOSIS RECORDS
const getDoctorDiagnosisRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({
      doctorId: req.params.doctorId,
    });

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getPatientMedicalHistory,
  getDoctorDiagnosisRecords,
};