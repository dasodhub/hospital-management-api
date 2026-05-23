const LabRequest = require("../models/LabRequest");
const LabResult = require("../models/LabResult");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.createLabRequest = async (payload) => {
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

  return LabRequest.create(payload);
};

exports.getLabRequests = async () => {
  return LabRequest.find()
    .populate("patient")
    .populate("doctor")
    .populate("consultation")
    .sort({ createdAt: -1 });
};

exports.getLabRequestById = async (id) => {
  const labRequest = await LabRequest.findById(id)
    .populate("patient")
    .populate("doctor")
    .populate("consultation");

  if (!labRequest) {
    const error = new Error("Lab request not found");
    error.statusCode = 404;
    throw error;
  }

  return labRequest;
};

exports.updateLabRequestStatus = async (id, status) => {
  const labRequest = await LabRequest.findById(id);

  if (!labRequest) {
    const error = new Error("Lab request not found");
    error.statusCode = 404;
    throw error;
  }

  labRequest.status = status;

  await labRequest.save();

  return labRequest;
};

exports.createLabResult = async (payload, userId) => {
  const labRequest = await LabRequest.findById(payload.labRequest);

  if (!labRequest) {
    const error = new Error("Lab request not found");
    error.statusCode = 404;
    throw error;
  }

  if (labRequest.status === "completed") {
    const error = new Error(
      "Lab result has already been submitted for this request"
    );
    error.statusCode = 400;
    throw error;
  }

  const existingResult = await LabResult.findOne({
    labRequest: payload.labRequest,
  });

  if (existingResult) {
    const error = new Error("Lab result already exists for this request");
    error.statusCode = 409;
    throw error;
  }

  const labResult = await LabResult.create({
    ...payload,
    uploadedBy: userId,
  });

  labRequest.status = "completed";
  await labRequest.save();

  return labResult;
};

exports.getLabResults = async () => {
  return LabResult.find()
    .populate("labRequest")
    .populate("patient")
    .populate("uploadedBy", "fullName email phone role")
    .sort({ createdAt: -1 });
};

exports.getLabResultById = async (id) => {
  const labResult = await LabResult.findById(id)
    .populate("labRequest")
    .populate("patient")
    .populate("uploadedBy", "fullName email phone role");

  if (!labResult) {
    const error = new Error("Lab result not found");
    error.statusCode = 404;
    throw error;
  }

  return labResult;
};
