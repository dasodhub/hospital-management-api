const Prescription = require("../models/Prescription");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createPrescription = async (payload) => {
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

  return Prescription.create(payload);
};

exports.getPrescriptions = async () => {
  return Prescription.find()
    .populate("patient")
    .populate("doctor")
    .populate("consultation")
    .sort({ createdAt: -1 });
};

exports.getPrescriptionById = async (id) => {
  const prescription = await Prescription.findById(id)
    .populate("patient")
    .populate("doctor")
    .populate("consultation");

  if (!prescription) {
    const error = new Error("Prescription not found");
    error.statusCode = 404;
    throw error;
  }

  return prescription;
};

exports.updatePrescriptionStatus = async (id, status) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    const error = new Error("Prescription not found");
    error.statusCode = 404;
    throw error;
  }

  prescription.status = status;

  await prescription.save();

  return prescription;
};
