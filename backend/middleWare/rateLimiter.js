const rateLimit = require('express-rate-limit');

// General API rate limiter - More permissive in development
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 1000 for dev, 100 for production
    message: 'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiter for authentication routes - More permissive in development
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.NODE_ENV === 'production' ? 5 : 50, // 50 for dev, 5 for production
    message: 'Too many login attempts, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for bid placement
const bidLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // 5 bids per minute
    message: 'Too many bids from this IP, please try again after a minute',
    standardHeaders: true,
    legacyHeaders: false,
});

// Rate limiter for product creation
const productCreationLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // 10 products per hour
    message: 'Too many products created, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    apiLimiter,
    authLimiter,
    bidLimiter,
    productCreationLimiter
};
