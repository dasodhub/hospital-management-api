const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: 6,
            select: false, // Exclude password from query results by default
        }, 

        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },

        role: {
            type: String,
            enum: [
                "admin",
                "doctor",
                "nurse",
                "receptionist",
                "lab_scientist",
                "pharmacist",
                "billing_officer",
                "patient",
            ],
            default: "patient",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

// Hash the password before saving the user
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
