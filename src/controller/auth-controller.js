const catchError = require('../utils/catch-error');
const creatError = require('../utils/create-error');
const userService = require('../services/user-service');
const hashService = require('../services/hash-service');
const jwtService = require('../services/jwt-service');

exports.register = catchError(async (req, res, next) => {
    const existUser = await userService.findUserByEmail(req.body.email);
    if (existUser) {
        creatError('email_already_use', 400);
    }
    req.body.password = await hashService.hash(req.body.password);

    const newUser = await userService.createUser(req.body);
    const payload =
    {
        userId: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
    };
    const accessToken = jwtService.sign(payload);
    delete newUser.password;

    res.status(201).json({ accessToken, newUser });
});