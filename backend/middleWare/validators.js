const { body, param, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');

// Middleware to check validation results
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// Product validation rules
const validateProduct = [
    body('title')
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters')
        .customSanitizer(value => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })),

    body('description')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters')
        .customSanitizer(value => sanitizeHtml(value, {
            allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li'],
            allowedAttributes: {}
        })),

    body('basePrice')
        .isFloat({ min: 0.01 })
        .withMessage('Base price must be a positive number'),

    body('category')
        .isMongoId()
        .withMessage('Invalid category ID'),

    body('bidEndDate')
        .isISO8601()
        .withMessage('Bid end date must be a valid date'),

    validate
];

// Bid validation rules
const validateBid = [
    body('price')
        .isFloat({ min: 0.01 })
        .withMessage('Bid price must be a positive number'),

    body('productId')
        .isMongoId()
        .withMessage('Invalid product ID'),

    validate
];

// User registration validation
const validateUserRegistration = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .customSanitizer(value => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })),

    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

    validate
];

// User login validation
const validateUserLogin = [
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email address'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    validate
];

// MongoDB ID validation
const validateMongoId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),

    validate
];

// Category validation
const validateCategory = [
    body('title')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Category title must be between 2 and 50 characters')
        .customSanitizer(value => sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })),

    validate
];

module.exports = {
    validateProduct,
    validateBid,
    validateUserRegistration,
    validateUserLogin,
    validateMongoId,
    validateCategory,
    validate
};
