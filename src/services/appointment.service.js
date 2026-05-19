const Appointment = require("../models/Appointment");



// BOOK APPOINTMENT SERVICE
const createAppointmentService = async (appointmentData) => {
  const {
    patient,
    doctor,
    appointmentDate,
    reason,
  } = appointmentData;


  // PREVENT PAST DATES
  const selectedDate = new Date(appointmentDate);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
    throw new Error("You cannot book past appointments");
  }


  // PREVENT DOUBLE BOOKING
  const existingAppointment = await Appointment.findOne({
    doctor,
    appointmentDate: selectedDate,
    status: {
      $in: ["pending", "confirmed"],
    },
  });

  if (existingAppointment) {
    throw new Error("Doctor is already booked for this time");
  }


  // CREATE APPOINTMENT
  const appointment = await Appointment.create({
    patient,
    doctor,
    appointmentDate,
    reason,
  });

  return appointment;
};




// GET ALL APPOINTMENTS SERVICE
const getAppointmentsService = async () => {
  const appointments = await Appointment.find()
    .populate("patient", "name email")
    .populate("doctor", "name email")
    .sort({ appointmentDate: 1 });

  return appointments;
};




// GET SINGLE APPOINTMENT SERVICE
const getSingleAppointmentService = async (id) => {
  const appointment = await Appointment.findById(id)
    .populate("patient", "name email")
    .populate("doctor", "name email");

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
};




// CONFIRM APPOINTMENT SERVICE
const confirmAppointmentService = async (id) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = "confirmed";

  await appointment.save();

  return appointment;
};




// COMPLETE APPOINTMENT SERVICE
const completeAppointmentService = async (id) => {
  const appointment = await Appointment.findById(id);

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  appointment.status = "completed";

  await appointment.save();

  return appointment;
};




// CHECK DOCTOR AVAILABILITY SERVICE
const checkDoctorAvailabilityService = async (
  doctorId,
  appointmentDate
) => {

  const existingAppointment = await Appointment.findOne({
    doctor: doctorId,
    appointmentDate: new Date(appointmentDate),
    status: {
      $in: ["pending", "confirmed"],
    },
  });

  if (existingAppointment) {
    return {
      available: false,
      message: "Doctor is not available",
    };
  }

  return {
    available: true,
    message: "Doctor is available",
  };
};




module.exports = {
  createAppointmentService,
  getAppointmentsService,
  getSingleAppointmentService,
  confirmAppointmentService,
  completeAppointmentService,
  checkDoctorAvailabilityService,
};