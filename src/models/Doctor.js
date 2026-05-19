const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Doctor must be linked to a user account"],
            unique: true,
        }, 

        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department", 
            required: [true, "Doctor must belong to a department"],
        },
        
        specialization: {
            type: String,
            required: [true, "Doctor specialization is required"],
            trim: true,
        }, 

        qualification: {
            type: String,
            trim: true,
        }, 

        yearsOfExperience: {
            type: Number,
            default: 0,
            min: 0,
        },

        availableDays: [
            {
                type: String,
                enum: [
                    "monday", 
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday"
                ],
            },
        ],

        availableTimes: [
            {
                type: String,
                trim: true,
            }
        ], 

        consultationFee: {
            type: Number, 
            default: 0,
            min: 0,
        },

        status: {
            type: String,
            enum: ["active", "inactive", "on_leave"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);



module.exports = mongoose.model("Doctor", doctorSchema);