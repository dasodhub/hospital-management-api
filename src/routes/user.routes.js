const router = require('express').Router();

const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');
const allowRoles = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');

const { updateUserSchema } = require('../validations/user.validation');

router.get(
    "/",
    auth,
    allowRoles("admin"),
    userController.getUsers
);

router.get(
    "/:id",
    auth,
    allowRoles("admin"),
    userController.getUserById
);

router.patch(
    "/:id",
    auth,
    allowRoles("admin"),
    validate(updateUserSchema),
    userController.updateUser
);

router.patch(
    "/:id/disable",
    auth,
    allowRoles("admin"),
    userController.disableUser
);

router.patch(
    "/:id/enable",
    auth,
    allowRoles("admin"),
    userController.enableUser
);

router.delete(
    "/:id",
    auth,
    allowRoles("admin"),
    userController.deleteUser
);

module.exports = router;
