
const appointmentService = require("../services/appointment.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.bookAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.bookAppointment(req.body);

  return successResponse(res, 201, "Appointment booked successfully", appointment);
});

exports.getAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getAppointments(req.query);

  return successResponse(
    res,
    200,
    "Appointments fetched successfully",
    appointments
  );
});

exports.getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.id);

  return successResponse(
    res,
    200,
    "Appointment fetched successfully",
    appointment
  );
});

exports.updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointment(
    req.params.id,
    req.body
  );

  return successResponse(
    res,
    200,
    "Appointment updated successfully",
    appointment
  );
});

exports.confirmAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentStatus(
    req.params.id,
    "confirmed"
  );

  return successResponse(
    res,
    200,
    "Appointment confirmed successfully",
    appointment
  );
});

exports.cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentStatus(
    req.params.id,
    "cancelled"
  );

  return successResponse(
    res,
    200,
    "Appointment cancelled successfully",
    appointment
  );
});

exports.completeAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentStatus(
    req.params.id,
    "completed"
  );

  return successResponse(
    res,
    200,
    "Appointment completed successfully",
    appointment
  );
});

exports.deleteAppointment = asyncHandler(async (req, res) => {
  await appointmentService.deleteAppointment(req.params.id);

  return successResponse(res, 200, "Appointment deleted successfully");
});