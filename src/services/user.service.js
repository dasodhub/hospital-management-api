const User = require('../models/User');

exports.getUsers = async () => {

    return User.find().select("-password").sort({ createdAt: -1 }); 
};

exports.getUserById = async (id) => {
    const user = await User.findById(id).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

exports.updateUser = async (id, payload) => {
    delete payload.password;
    delete payload.email;

    const user = await User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

exports.disableUser = async (id) => {
    const user = await User.findByIdAndUpdate(
        id, 
        { isActive: false },
        { new: true, runValidators: true },
        
    ).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
}


exports.enableUser = async (id) => {
    const user = await User.findByIdAndUpdate(
        id, 
        { isActive: true },
        { new: true, runValidators: true },
    ).select("-password");

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
}


exports.deleteUser = async (id) => {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};
