const MedicalRecord = require("../models/MedicalRecord");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createMedicalRecord = async (payload) => {
  const patient = await Patient.findById(payload.patient);

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const doctor = await Doctor.findById(payload.doctor);

  if (!doctor) {
    const error = new Error("Doctor not found");
    error.statusCode = 404;
    throw error;
  }

  return MedicalRecord.create(payload);
};

exports.getMedicalRecords = async () => {
  return MedicalRecord.find()
    .populate("patient")
    .populate("doctor")
    .populate("consultation")
    .sort({ createdAt: -1 });
};

exports.getMedicalRecordById = async (id) => {
  const record = await MedicalRecord.findById(id)
    .populate("patient")
    .populate("doctor")
    .populate("consultation");

  if (!record) {
    const error = new Error("Medical record not found");
    error.statusCode = 404;
    throw error;
  }

  return record;
};
