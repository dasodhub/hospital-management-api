const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse } = require('../utils/apiResponse');


exports.getUsers = asyncHandler(async (req, res) => {
    const users = await userService.getUsers();
    
    return successResponse(res, 200, "Users fetched successfully", users);
});

exports.getUserById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    
    return successResponse(res, 200, "User fetched successfully", user);
});

exports.updateUser = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);

    return successResponse(res, 200, "User updated successfully", user);
});

exports.disableUser = asyncHandler(async (req, res) => {
    const user = await userService.disableUser(req.params.id);

    return successResponse(res, 200, "User disabled successfully", user);
});

exports.enableUser = asyncHandler(async (req, res) => {
    const user = await userService.enableUser(req.params.id);

    return successResponse(res, 200, "User enabled successfully", user);
});

exports.deleteUser = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);

    return successResponse(res, 200, "User deleted successfully");
})