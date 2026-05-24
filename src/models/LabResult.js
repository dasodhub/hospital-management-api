const mongoose = require("mongoose");

const labResultSchema = new mongoose.Schema(
  {
    labRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LabRequest",
      required: true,
      unique: true,
    },

    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    result: {
      type: String,
      required: true,
    },

    comment: String,

    resultFile: String,

    status: {
      type: String,
      enum: ["draft", "submitted"],
      default: "submitted",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabResult", labResultSchema);
