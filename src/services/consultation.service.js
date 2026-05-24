const Consultation = require("../models/Consultation");

exports.createConsultation = async (data) => {
  const existing = await Consultation.findOne({
    appointment: data.appointment,
  });

  if (existing) {
    const error = new Error("Consultation already exists for this appointment");
    error.statusCode = 400;
    throw error;
  }

  const consultation = await Consultation.create(data);
  return consultation
    .populate([
      { path: "appointment" },
      { path: "patient", populate: { path: "user", select: "fullName email phone" } },
      { path: "doctor", populate: { path: "user", select: "fullName email phone" } },
    ]);
};

exports.getAllConsultations = async () => {
  return Consultation.find()
    .populate("appointment")
    .populate({
      path: "patient",
      populate: { path: "user", select: "fullName email phone" },
    })
    .populate({
      path: "doctor",
      populate: { path: "user", select: "fullName email phone" },
    })
    .sort({ createdAt: -1 });
};

exports.getConsultationById = async (id) => {
  const consultation = await Consultation.findById(id)
    .populate("appointment")
    .populate({
      path: "patient",
      populate: { path: "user", select: "fullName email phone" },
    })
    .populate({
      path: "doctor",
      populate: { path: "user", select: "fullName email phone" },
    });

  if (!consultation) {
    const error = new Error("Consultation not found");
    error.statusCode = 404;
    throw error;
  }

  return consultation;
};

exports.getConsultationsByPatient = async (patientId) => {
  return Consultation.find({ patient: patientId })
    .populate("appointment")
    .populate({
      path: "doctor",
      populate: { path: "user", select: "fullName email phone" },
    })
    .sort({ createdAt: -1 });
};

exports.getConsultationsByDoctor = async (doctorId) => {
  return Consultation.find({ doctor: doctorId })
    .populate("appointment")
    .populate({
      path: "patient",
      populate: { path: "user", select: "fullName email phone" },
    })
    .sort({ createdAt: -1 });
};

exports.updateConsultation = async (id, data) => {
  const consultation = await Consultation.findById(id);

  if (!consultation) {
    const error = new Error("Consultation not found");
    error.statusCode = 404;
    throw error;
  }

  if (consultation.status === "completed") {
    const error = new Error("Cannot update a completed consultation");
    error.statusCode = 400;
    throw error;
  }

  const updated = await Consultation.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }
  )
    .populate("appointment")
    .populate({
      path: "patient",
      populate: { path: "user", select: "fullName email phone" },
    })
    .populate({
      path: "doctor",
      populate: { path: "user", select: "fullName email phone" },
    });

  return updated;
};

exports.updateConsultationStatus = async (id, status) => {
  const consultation = await Consultation.findById(id);

  if (!consultation) {
    const error = new Error("Consultation not found");
    error.statusCode = 404;
    throw error;
  }

  if (consultation.status === "cancelled" && status === "completed") {
    const error = new Error("Cancelled consultation cannot be completed");
    error.statusCode = 400;
    throw error;
  }

  if (consultation.status === "completed" && status !== "completed") {
    const error = new Error("Completed consultation status cannot be changed");
    error.statusCode = 400;
    throw error;
  }

  if (consultation.status === "cancelled" && status !== "cancelled") {
    const error = new Error("Cancelled consultation status cannot be changed");
    error.statusCode = 400;
    throw error;
  }

  consultation.status = status;
  await consultation.save();

  return consultation.populate([
    { path: "appointment" },
    {
      path: "patient",
      populate: { path: "user", select: "fullName email phone" },
    },
    {
      path: "doctor",
      populate: { path: "user", select: "fullName email phone" },
    },
  ]);
};

exports.deleteConsultation = async (id) => {
  const consultation = await Consultation.findById(id);

  if (!consultation) {
    const error = new Error("Consultation not found");
    error.statusCode = 404;
    throw error;
  }

  if (consultation.status === "completed") {
    const error = new Error("Cannot delete a completed consultation");
    error.statusCode = 400;
    throw error;
  }

  await Consultation.findByIdAndDelete(id);
  return consultation;
};
