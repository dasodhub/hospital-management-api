const authService = require('../services/auth.service');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');

exports.register = asyncHandler(async (req, res) => {
    const data = await authService.register(req.body);

    return successResponse(res, 201, "User registered successfully", data);
});


exports.login = asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);

    return successResponse(res, 200, "Login successful", data);
});

exports.getMe = asyncHandler(async (req, res) => {
    const user = await authService.getMe(req.user._id);

    return successResponse(res, 200, "Profile fetched successfully", user);
});