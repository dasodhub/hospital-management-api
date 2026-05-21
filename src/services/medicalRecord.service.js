const MedicalRecord = require("../models/MedicalRecord");


const createMedicalRecordService = async (data) => {
  const { patientId, doctorId, consultationId, symptoms, diagnosis, treatment } = data;

  
  if (!patientId || !doctorId || !consultationId || !symptoms || !diagnosis || !treatment) {
    throw new Error("All required fields must be provided");
  }

  
  const existingRecord = await MedicalRecord.findOne({ consultationId });

  if (existingRecord) {
    throw new Error("Medical record already exists for this consultation");
  }


  const record = await MedicalRecord.create(data);

  return record;
};


const getPatientHistoryService = async (patientId) => {
  if (!patientId) {
    throw new Error("Patient ID is required");
  }

  const records = await MedicalRecord.find({ patientId })
    .sort({ createdAt: -1 });

  return records;
};


const getDoctorRecordsService = async (doctorId) => {
  if (!doctorId) {
    throw new Error("Doctor ID is required");
  }

  const records = await MedicalRecord.find({ doctorId })
    .sort({ createdAt: -1 });

  return records;
};


const getSingleRecordService = async (id) => {
  const record = await MedicalRecord.findById(id);

  if (!record) {
    throw new Error("Medical record not found");
  }

  return record;
};

module.exports = {
  createMedicalRecordService,
  getPatientHistoryService,
  getDoctorRecordsService,
  getSingleRecordService,
};