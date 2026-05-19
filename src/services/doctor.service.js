const Doctor = require("../models/Doctor");
const User = require("../models/User");
const Department = require("../models/Department");

exports.createDoctor = async (payload) => {
    const user = await User.findById(payload.user);

    if (!user) {
        const error = new Error("User account not found");
        error.statusCode = 404;
        throw error;
    }

    if (user.role !== "doctor") {
        const error = new Error("Selected user must have a doctor role");
        error.statusCode = 400;
        throw error;
    }

    const department = await Department.findById(payload.department);

    if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        throw error;
    }

    const existingDoctor = await Doctor.findOne({ user: payload.user });

    if (existingDoctor) {
        const error = new Error("Doctor profile already exists for this user");
        error.statusCode = 400;
        throw error;
    }

    const doctor = await Doctor.create(payload);
    return doctor;
};


exports.getDoctors = async (filter = {}) => {
    const query = {};

    if (filter.status) {
        query.status = filter.status;
    }

    if (filter.department) {
        query.department = filter.department;
    }

    if (filter.specialization) {
        query.specialization = { $regex: filter.specialization, $options: "i" };
    }

    const doctors = await Doctor.find(query)
        .populate("user", "fullName email phone role isActive")
        .populate("department", "name description status")
        .sort({ createdAt: -1 });

    return doctors;
};


exports.getDoctorById = async (id) => {
    const doctor = await Doctor.findById(id)
        .populate("user", "fullName email phone role isActive")
        .populate("department", "name description status");


    if (!doctor) {
        const error = new Error("Doctor not found");
        error.statusCode = 404;
        throw error;
    }

    return doctor;
}

exports.updateDoctor = async (id, payload) => {
    const doctor = await Doctor.findById(id);

    if (!doctor) {
        const error = new Error("Doctor not found");
        error.statusCode = 404;
        throw error;
    }

    if (payload.department) {
        const department = await Department.findById(payload.department);

        if (!department) {
            const error = new Error("Department not found");
            error.statusCode = 404;
            throw error;
        }
    }

    Object.assign(doctor, payload);

    await doctor.save();

    return doctor;
};

exports.deleteDoctor = async (id) => {
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
        const error = new Error("Doctor not found");
        error.statusCode = 404;
        throw error;
    }

    return doctor;
};

exports.updateDoctorStatus = async (id, status) => {
    const allowedStatuses = ["active", "inactive", "on_leave"];

    if (!allowedStatuses.includes(status)) {
        const error = new Error("Invalid doctor status");
        error.statusCode = 400;
        throw error;
    }

    const doctor = await Doctor.findById(id);

    if (!doctor) {
        const error = new Error("Doctor not found");
        error.statusCode = 404;
        throw error;
    }

    doctor.status = status;
    await doctor.save();
    return doctor;
}