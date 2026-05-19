const Prescription = require("../models/Prescription");

// Create a new prescription with business logic checks
const createPrescription = async ({ patient, doctor, diagnosis, medications, notes, expiresAt }) => {
  // Auto-set expiry to 30 days from now if not provided
  if (!expiresAt) {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    expiresAt = date;
  }

  // Check for duplicate active prescription for same patient and diagnosis
  const existing = await Prescription.findOne({
    patient,
    diagnosis,
    status: "active",
  });

  if (existing) {
    throw new Error(
      `An active prescription for "${diagnosis}" already exists for this patient`
    );
  }

  const prescription = await Prescription.create({
    patient,
    doctor,
    diagnosis,
    medications,
    notes,
    expiresAt,
    status: "active",
  });

  await prescription.populate("patient", "name email");
  await prescription.populate("doctor", "name email");

  return prescription;
};

// Get all prescriptions based on user role
const getAllPrescriptions = async (user) => {
  let query = {};

  if (user.role === "doctor") {
    query.doctor = user._id;
  } else if (user.role === "patient") {
    query.patient = user._id;
  }
  // admin gets all — no filter

  const prescriptions = await Prescription.find(query)
    .populate("patient", "name email")
    .populate("doctor", "name email")
    .sort({ createdAt: -1 });

  return prescriptions;
};

// Get a single prescription by ID with access control
const getPrescriptionById = async (id, user) => {
  const prescription = await Prescription.findById(id)
    .populate("patient", "name email")
    .populate("doctor", "name email");

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  const isDoctor = prescription.doctor._id.toString() === user._id.toString();
  const isPatient = prescription.patient._id.toString() === user._id.toString();
  const isAdmin = user.role === "admin";

  if (!isDoctor && !isPatient && !isAdmin) {
    throw new Error("Not authorized to view this prescription");
  }

  return prescription;
};

// Update prescription — only the doctor who created it or admin
const updatePrescription = async (id, updates, user) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  const isOwner = prescription.doctor.toString() === user._id.toString();

  if (!isOwner && user.role !== "admin") {
    throw new Error("Not authorized to update this prescription");
  }

  // Prevent updating a cancelled or completed prescription
  if (prescription.status !== "active") {
    throw new Error(`Cannot update a prescription with status "${prescription.status}"`);
  }

  const updated = await Prescription.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
    .populate("patient", "name email")
    .populate("doctor", "name email");

  return updated;
};

// Soft-cancel a prescription instead of hard delete
const cancelPrescription = async (id, user) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  const isOwner = prescription.doctor.toString() === user._id.toString();

  if (!isOwner && user.role !== "admin") {
    throw new Error("Not authorized to cancel this prescription");
  }

  if (prescription.status === "cancelled") {
    throw new Error("Prescription is already cancelled");
  }

  prescription.status = "cancelled";
  await prescription.save();

  return prescription;
};

// Hard delete — admin only
const deletePrescription = async (id) => {
  const prescription = await Prescription.findById(id);

  if (!prescription) {
    throw new Error("Prescription not found");
  }

  await prescription.deleteOne();
};

// Get all prescriptions for a specific patient
const getPatientPrescriptions = async (patientId) => {
  const prescriptions = await Prescription.find({ patient: patientId })
    .populate("doctor", "name email")
    .sort({ createdAt: -1 });

  if (!prescriptions.length) {
    throw new Error("No prescriptions found for this patient");
  }

  return prescriptions;
};

// Auto-expire prescriptions whose expiry date has passed
const expireOldPrescriptions = async () => {
  const result = await Prescription.updateMany(
    {
      status: "active",
      expiresAt: { $lt: new Date() },
    },
    { status: "completed" }
  );

  return result.modifiedCount;
};

// Get prescription stats — for admin dashboard
const getPrescriptionStats = async () => {
  const stats = await Prescription.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  const total = await Prescription.countDocuments();

  return { total, breakdown: stats };
};

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  cancelPrescription,
  deletePrescription,
  getPatientPrescriptions,
  expireOldPrescriptions,
  getPrescriptionStats,
};
