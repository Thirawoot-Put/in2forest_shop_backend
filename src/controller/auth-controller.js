const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");

exports.register = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmail(req.body.email);
  if (existUser) {
    createError("email_already_use", 400);
  }
  req.body.password = await hashService.hash(req.body.password);

  const newUser = await userService.createUser(req.body);
  const payload = {
    userId: newUser.id,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  };
  const accessToken = jwtService.sign(payload);
  delete newUser.password;

  res.status(201).json({ accessToken, newUser });
});

exports.login = catchError(async (req, res, next) => {
  const existUser = await userService.findUserByEmail(req.body.email);
  if (!existUser) {
    createError("Invalid email address or password", 400);
  }
  const matchUser = await hashService.compare(
    req.body.password,
    existUser.password
  );
  if (!matchUser) {
    createError("Invalid email address or password", 400);
  }
  const payload = {
    userId: existUser.id,
    firstName: existUser.firstName,
    lastName: existUser.lastName,
  };
  const token = jwtService.sign(payload);
  delete existUser.password;
  res.status(200).json({ token, user: existUser });
});

exports.me = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
