require("dotenv").config();

const mongoose = require("mongoose");
const User = require("./models/User");
const Department = require("./models/Department");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for seeding...");

    // Create default admin
    const existingAdmin = await User.findOne({
      email: "admin@hospital.com",
    });

    if (!existingAdmin) {
      await User.create({
        fullName: "System Admin",
        email: "admin@hospital.com",
        password: "password123",
        phone: "08010000000",
        role: "admin",
      });

      console.log("Default admin created successfully");
    } else {
      console.log("Default admin already exists");
    }

    // Create default department
    const existingDepartment = await Department.findOne({
      name: "General Medicine",
    });

    if (!existingDepartment) {
      await Department.create({
        name: "General Medicine",
        description: "For consultations, routine check-ups, and follow-ups.",
        status: "active",
      });

      console.log("Default department created successfully");
    } else {
      console.log("Default department already exists");
    }

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();
