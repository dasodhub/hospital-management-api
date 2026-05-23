const Pharmacy = require("../models/Pharmacy");
const Prescription = require("../models/Prescription");

exports.dispensePrescription = async (payload, userId) => {
  const prescription = await Prescription.findById(payload.prescription);

  if (!prescription) {
    const error = new Error("Prescription not found");
    error.statusCode = 404;
    throw error;
  }

  if (prescription.status === "dispensed") {
    const error = new Error("Prescription has already been dispensed");
    error.statusCode = 400;
    throw error;
  }

  const pharmacyRecord = await Pharmacy.create({
    ...payload,
    dispensedBy: userId,
  });

  prescription.status = payload.status || "dispensed";

  await prescription.save();

  return pharmacyRecord;
};

exports.getPharmacyRecords = async () => {
  return Pharmacy.find()
    .populate("prescription")
    .populate("patient")
    .populate("dispensedBy", "fullName email phone role")
    .sort({ createdAt: -1 });
};

exports.getPharmacyRecordById = async (id) => {
  const record = await Pharmacy.findById(id)
    .populate("prescription")
    .populate("patient")
    .populate("dispensedBy", "fullName email phone role");

  if (!record) {
    const error = new Error("Pharmacy record not found");
    error.statusCode = 404;
    throw error;
  }

  return record;
};
