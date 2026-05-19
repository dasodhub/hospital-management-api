const mongoose = require("mongoose");

const prescriptionItemSchema = new mongoose.Schema({
  medicationName: {
    type: String,
    required: [true, "Medication name is required"],
  },
  dosage: {
    type: String,
    required: [true, "Dosage is required"],
  },
  frequency: {
    type: String,
    required: [true, "Frequency is required"],
    enum: ["once daily", "twice daily", "three times daily", "four times daily", "as needed"],
  },
  duration: {
    type: String,
    required: [true, "Duration is required"],
  },
  instructions: {
    type: String,
  },
});

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Patient is required"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Doctor is required"],
    },
    diagnosis: {
      type: String,
      required: [true, "Diagnosis is required"],
    },
    medications: {
      type: [prescriptionItemSchema],
      validate: {
        validator: (val) => val.length > 0,
        message: "At least one medication is required",
      },
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
    issuedAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
