const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Department description is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);