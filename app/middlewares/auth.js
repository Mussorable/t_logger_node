const { body, validationResult } = require('express-validator');

const registerValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('fname').isLength({ min: 2 }).withMessage('First name is required and must be at least 2 characters'),
    body('sname').isLength({ min: 2 }).withMessage('Last name is required and must be at least 2 characters'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    registerValidation,
    loginValidation,
    validate,
};