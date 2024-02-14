const Joi = require('joi');
const validate = require('./validator');

const registerSchema = Joi.object({
    email: Joi.string().email({ tlds: false }).required().messages({
        'string.empty': 'Email address is required',
        'string.email': 'Email address must be in correct form'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/).required().messages({
        'string.empty': 'Password is required',
        'string.pattern.base': 'Password must contain only alphabet and number and at least 6 characters'
    }),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
        'string.empty': 'Confirm password is required',
        'any.only': 'Password and confirm password not match'
    }).strip(),
    firstName: Joi.string().trim().required().messages({
        'string.empty': 'First name is required'
    }),
    lastName: Joi.string().trim().required().messages({
        'string.empty': 'Last name is required'
    }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.pattern.base': 'Mobile number must be 10 characters'
    })
});

exports.validateRegister = validate(registerSchema);