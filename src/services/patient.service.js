const Patient = require("../models/Patient");


const createPatient = async (userId, patientData) => {
  
  const existingPatient = await Patient.findOne({ user: userId });
  if (existingPatient) {
    throw new Error("Patient record already exists for this user");
  }

  
  const patient = await Patient.create({
    user: userId,
    ...patientData,
  });

  return patient;
};


const getAllPatients = async () => {
  const patients = await Patient.find({ isActive: true })
    .populate("user", "fullName email phone role")
    .sort({ createdAt: -1 });

  return patients;
};


const getPatientById = async (patientId) => {
  const patient = await Patient.findById(patientId)
    .populate("user", "fullName email phone role");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};


const getPatientByUserId = async (userId) => {
  const patient = await Patient.findOne({ user: userId })
    .populate("user", "fullName email phone role");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};


const updatePatient = async (patientId, updateData) => {
  const patient = await Patient.findByIdAndUpdate(
    patientId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).populate("user", "fullName email phone role");

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
};


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