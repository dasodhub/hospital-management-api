const {
  createAppointmentValidation,
} = require("../validation/appointment.validation");

const {
  createAppointmentService,
  getAppointmentsService,
  getSingleAppointmentService,
  confirmAppointmentService,
  completeAppointmentService,
  checkDoctorAvailabilityService,
} = require("../services/appointment.service");




// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {

    const { error } = createAppointmentValidation(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }


    const appointment = await createAppointmentService(req.body);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {

    res.status(400).json({
      message: error.message,
    });

  }
};




// GET ALL APPOINTMENTS
const getAppointments = async (req, res) => {
  try {

    const appointments = await getAppointmentsService();

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// GET SINGLE APPOINTMENT
const getSingleAppointment = async (req, res) => {
  try {

    const appointment =
      await getSingleAppointmentService(req.params.id);

    res.status(200).json(appointment);

  } catch (error) {

    res.status(404).json({
      message: error.message,
    });

  }
};




// CONFIRM APPOINTMENT
const confirmAppointment = async (req, res) => {
  try {

    const appointment =
      await confirmAppointmentService(req.params.id);

    res.status(200).json({
      message: "Appointment confirmed successfully",
      appointment,
    });

  } catch (error) {

    res.status(404).json({
      message: error.message,
    });

  }
};




// COMPLETE APPOINTMENT
const completeAppointment = async (req, res) => {
  try {

    const appointment =
      await completeAppointmentService(req.params.id);

    res.status(200).json({
      message: "Appointment completed successfully",
      appointment,
    });

  } catch (error) {

    res.status(404).json({
      message: error.message,
    });

  }
};




// CHECK DOCTOR AVAILABILITY
const checkDoctorAvailability = async (req, res) => {
  try {

    const { doctorId, appointmentDate } = req.query;

    const availability =
      await checkDoctorAvailabilityService(
        doctorId,
        appointmentDate
      );

    res.status(200).json(availability);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




module.exports = {
  bookAppointment,
  getAppointments,
  getSingleAppointment,
  confirmAppointment,
  completeAppointment,
  checkDoctorAvailability,
};