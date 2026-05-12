const Patient = require("../models/Patient");

//Create Patient
const createPatient = async (userId, patientData) => {

  // Check if user already has a patient record
  const existingPatient = await Patient.findOne({ user: userId });
  if (existingPatient) {
    throw new Error("Patient record already exists for this user");
  }

  // Create new patient
  const patient = await Patient.create({
    user: userId,
    ...patientData,
  });

  return patient;
};

// Get All Patients
const getAllPatients = async () => {
  const patients = await Patient.find({ isActive: true })
    .populate("user", "fullName email")
    .sort({ createdAt: -1 });

  return patients;
};

//Get Single Patient
const getPatientById = async (patientId) => {
  const patient = await Patient.findById(patientId)
    .populate("user", "fullName email");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

// Get Patient By User ID
const getPatientByUserId = async (userId) => {
  const patient = await Patient.findOne({ user: userId })
    .populate("user", "fullName email");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

// Update Patient 
const updatePatient = async (patientId, updateData) => {
  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("user", "fullName email");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

// Delete Patient (soft delete)
const deletePatient = async (patientId) => {
  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { isActive: false },
    { new: true }
  );

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  getPatientByUserId,
  updatePatient,
  deletePatient,
};