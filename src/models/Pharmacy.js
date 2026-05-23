const mongoose = require("mongoose");

const pharmacySchema = new mongoose.Schema(
  {
    prescription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prescription",
      required: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    dispensedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    drugsDispensed: [
      {
        name: String,
        quantity: Number,
        note: String,
      },
    ],

    status: {
      type: String,
      enum: ["pending", "dispensed", "partially_dispensed", "cancelled"],
      default: "dispensed",
    },

    dispensedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacy", pharmacySchema);
