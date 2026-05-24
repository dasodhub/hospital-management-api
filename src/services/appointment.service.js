
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

exports.bookAppointment = async (payload) => {
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

  if (doctor.status !== "active") {
    const error = new Error("Doctor is not available for appointment");
    error.statusCode = 400;
    throw error;
  }

  const appointmentDate = new Date(payload.appointmentDate);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  appointmentDate.setHours(0, 0, 0, 0);

  if (appointmentDate < today) {
    const error = new Error("Appointment date cannot be in the past");
    error.statusCode = 400;
    throw error;
  }

  const existingAppointment = await Appointment.findOne({
    doctor: payload.doctor,
    appointmentDate: appointmentDate,
    appointmentTime: payload.appointmentTime,
    status: { $in: ["pending", "confirmed"] },
  });

  if (existingAppointment) {
    const error = new Error("Doctor is already booked for this date and time");
    error.statusCode = 409;
    throw error;
  }

  const appointment = await Appointment.create({
    ...payload,
    appointmentDate,
  });

  return appointment;
};

exports.getAppointments = async (filters = {}) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.patient) {
    query.patient = filters.patient;
  }

  if (filters.doctor) {
    query.doctor = filters.doctor;
  }

  const appointments = await Appointment.find(query)
    .populate("patient")
    .populate({
      path: "doctor",
      populate: [
        {
          path: "user",
          select: "fullName email phone role isActive",
        },
        {
          path: "department",
          select: "name description status",
        },
      ],
    })
    .sort({ appointmentDate: 1, appointmentTime: 1 });

  return appointments;
};

exports.getAppointmentById = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate("patient")
    .populate({
      path: "doctor",
      populate: [
        {
          path: "user",
          select: "fullName email phone role isActive",
        },
        {
          path: "department",
          select: "name description status",
        },
      ],
    });

  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  return appointment;
};

exports.updateAppointment = async (id, payload) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  if (appointment.status === "completed") {
    const error = new Error("Completed appointment cannot be updated");
    error.statusCode = 400;
    throw error;
  }

  if (appointment.status === "cancelled") {
    const error = new Error("Cancelled appointment cannot be updated");
    error.statusCode = 400;
    throw error;
  }

  if (payload.appointmentDate || payload.appointmentTime) {
    const newDate = payload.appointmentDate
      ? new Date(payload.appointmentDate)
      : appointment.appointmentDate;

    const newTime = payload.appointmentTime || appointment.appointmentTime;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkDate = new Date(newDate);
    checkDate.setHours(0, 0, 0, 0);

    if (checkDate < today) {
      const error = new Error("Appointment date cannot be in the past");
      error.statusCode = 400;
      throw error;
    }

    const existingAppointment = await Appointment.findOne({
      _id: { $ne: id },
      doctor: appointment.doctor,
      appointmentDate: checkDate,
      appointmentTime: newTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (existingAppointment) {
      const error = new Error("Doctor is already booked for this date and time");
      error.statusCode = 409;
      throw error;
    }

    payload.appointmentDate = checkDate;
  }

  Object.assign(appointment, payload);

  await appointment.save();

  return appointment;
};

exports.updateAppointmentStatus = async (id, status) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  if (appointment.status === "cancelled" && status === "completed") {
    const error = new Error("Cancelled appointment cannot be completed");
    error.statusCode = 400;
    throw error;
  }

  if (appointment.status === "completed" && status !== "completed") {
    const error = new Error("Completed appointment status cannot be changed");
    error.statusCode = 400;
    throw error;
  }

  if (appointment.status === "cancelled" && status !== "cancelled") {
    const error = new Error("Cancelled appointment status cannot be changed");
    error.statusCode = 400;
    throw error;
  }

  appointment.status = status;

  await appointment.save();

  return appointment;
};

exports.deleteAppointment = async (id) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    const error = new Error("Appointment not found");
    error.statusCode = 404;
    throw error;
  }

  if (appointment.status === "completed") {
    const error = new Error("Completed appointment cannot be deleted");
    error.statusCode = 400;
    throw error;
  }

  await Appointment.findByIdAndDelete(id);

  return appointment;
};