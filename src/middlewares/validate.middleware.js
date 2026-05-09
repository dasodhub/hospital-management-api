const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const message = error.details.map((details) => details.message).join(", ");

            return res.status(400).json({
                success: false,
                message,
            });
        }

        req.body = value;
        next();
    };
};

module.exports = validate;