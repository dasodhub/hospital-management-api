const User = require('../models/User');
const generateToken = require('../utils/generateToken');

exports.register = async (payload) => {
    const existingUser = await User.findOne({ email: payload.email });

    if (existingUser) {
        const error = new Error("Email already in use");
        error.statusCode = 400;
        throw error;
    }

    const user = await User.create(payload);

    const token = generateToken(user);

    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
        },
        token,
    };
};


exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const passwordIsCorrect = await user.comparePassword(password);

    if (!passwordIsCorrect) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    if (!user.isActive) {
        const error = new Error("This account has been disabled");
        error.statusCode = 403;
        throw error;
    }

    const token = generateToken(user);

    return {
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isActive: user.isActive,
        },
        token,
    };

};

exports.getMe = async (userId) => {
    const user = await User.findById(userId).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
}
