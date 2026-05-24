const doctorService = require("../services/doctor.service");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse } = require("../utils/apiResponse");

exports.createDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.createDoctor(req.body);

    return successResponse(res, 201, "Doctor profile created successfully", doctor);
});

exports.getDoctors = asyncHandler(async (req, res) => {
    const doctors = await doctorService.getDoctors(req.query);

    return successResponse(res, 200, "Doctors fetched successfully", doctors);
});

exports.getDoctorById = asyncHandler(async (req, res) => {
    const doctor = await doctorService.getDoctorById(req.params.id);
    
    return successResponse(res, 200, "Doctor fetched successfully", doctor);
});

exports.updateDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.updateDoctor(req.params.id, req.body);

    return successResponse(res, 200, "Doctor profile updated successfully", doctor);

});

exports.deleteDoctor = asyncHandler(async (req, res) => {
    await doctorService.deleteDoctor(req.params.id);

    return successResponse(res, 200, "Doctor profile deleted successfully");
});

exports.activateDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.updateDoctorStatus(req.params.id, "active");

    return successResponse(res, 200, "Doctor profile activated successfully", doctor);
});

exports.deactivateDoctor = asyncHandler(async (req, res) => {
    const doctor = await doctorService.updateDoctorStatus(req.params.id, "inactive");

    return successResponse(res, 200, "Doctor profile deactivated successfully", doctor);
});


exports.markDoctorOnLeave = asyncHandler(async (req, res) => {
    const doctor = await doctorService.updateDoctorStatus(req.params.id, "on_leave");

    return successResponse(res, 200, "Doctor profile marked as on leave successfully", doctor);
});