const router = require('express').Router();

const authController = require('../controllers/auth.controller');

const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const {
    registerSchema,
    loginSchema,
} = require('../validations/auth.validation');

router.post('/register', validate(registerSchema), authController.register);

router.post('/login', validate(loginSchema), authController.login);

router.get('/me', auth, authController.getMe);

module.exports = router;