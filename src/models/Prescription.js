const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
    },

    medications: [
      {
        name: {
          type: String,
          required: true,
        },
        dosage: String,
        frequency: String,
        duration: String,
        instruction: String,
      },
    ],

    instructions: String,

    status: {
      type: String,
      enum: ["pending", "dispensed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
