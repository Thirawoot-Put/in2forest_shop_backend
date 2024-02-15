const { rateLimit } = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 1000 * 60 * 5,
    // windowMs: 1000,
    limit: 100,
    message: { message: "too many request in a given period" }
});