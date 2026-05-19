const prescriptionService = require("../services/prescriptionService");

// @desc    Create a new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor, Admin)
const createPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionService.createPrescription({
      ...req.body,
      doctor: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: prescription,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all prescriptions (role-based)
// @route   GET /api/prescriptions
// @access  Private
const getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions(req.user);

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single prescription by ID
// @route   GET /api/prescriptions/:id
// @access  Private
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await prescriptionService.getPrescriptionById(
      req.params.id,
      req.user
    );

    res.status(200).json({ success: true, data: prescription });
  } catch (error) {
    const status = error.message.includes("Not authorized") ? 403
      : error.message.includes("not found") ? 404
      : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

// @desc    Update a prescription
// @route   PUT /api/prescriptions/:id
// @access  Private (Doctor, Admin)
const updatePrescription = async (req, res) => {
  try {
    const prescription = await prescriptionService.updatePrescription(
      req.params.id,
      req.body,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Prescription updated successfully",
      data: prescription,
    });
  } catch (error) {
    const status = error.message.includes("Not authorized") ? 403
      : error.message.includes("not found") ? 404
      : 400;
    res.status(status).json({ success: false, message: error.message });
  }
};

// @desc    Cancel a prescription (soft delete)
// @route   PATCH /api/prescriptions/:id/cancel
// @access  Private (Doctor, Admin)
const cancelPrescription = async (req, res) => {
  try {
    const prescription = await prescriptionService.cancelPrescription(
      req.params.id,
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Prescription cancelled successfully",
      data: prescription,
    });
  } catch (error) {
    const status = error.message.includes("Not authorized") ? 403
      : error.message.includes("not found") ? 404
      : 400;
    res.status(status).json({ success: false, message: error.message });
  }
};

// @desc    Hard delete a prescription
// @route   DELETE /api/prescriptions/:id
// @access  Private (Admin only)
const deletePrescription = async (req, res) => {
  try {
    await prescriptionService.deletePrescription(req.params.id);

    res.status(200).json({
      success: true,
      message: "Prescription deleted successfully",
    });
  } catch (error) {
    const status = error.message.includes("not found") ? 404 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

// @desc    Get all prescriptions for a specific patient
// @route   GET /api/prescriptions/patient/:patientId
// @access  Private (Doctor, Admin)
const getPatientPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getPatientPrescriptions(
      req.params.patientId
    );

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: prescriptions,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @desc    Get prescription statistics
// @route   GET /api/prescriptions/stats
// @access  Private (Admin only)
const getPrescriptionStats = async (req, res) => {
  try {
    const stats = await prescriptionService.getPrescriptionStats();

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  cancelPrescription,
  deletePrescription,
  getPatientPrescriptions,
  getPrescriptionStats,
};
