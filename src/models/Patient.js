const mongoose = require("mongoose");

// Patient Schema
const patientSchema = new mongoose.Schema(
  {
    // Reference to User (Auth module)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Auto-generated Patient ID
    patientId: {
      type: String,
      unique: true,
    },

    // Personal Information
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    //Medical Information
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      required: true,
    },

    genotype: {
      type: String,
      enum: ["AA", "AS", "SS", "AC"],
      required: true,
    },

    // Emergency Contact
    emergencyContact: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      relationship: { type: String, required: true },
    },

    // Allergies
    allergies: {
      type: [String],
      default: [],
    },

    // ─── Account Status ──
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    // ─── Automatically add createdAt and updatedAt ────
    timestamps: true,
  }
);

// ─── Auto-generate Patient ID before saving ───────────
patientSchema.pre("save", async function () {
  if (!this.patientId) {
    // Count existing patients and generate ID
    const count = await mongoose.model("Patient").countDocuments();
    this.patientId = `PAT${String(count + 1).padStart(4, "0")}`;
  }

});

module.exports = mongoose.model("Patient", patientSchema);