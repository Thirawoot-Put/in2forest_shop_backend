const catchError = require("../utils/catch-error");

const userService = require("../services/user-service");
const createError = require("../utils/create-error");

exports.updateUserInfo = catchError(async (req, res, next) => {
  const userId = +req.params.userId;
  const existUser = await userService.findUserById(userId);
  if (!existUser) {
    return createError("User not found", 400);
  }
  const updateUser = await userService.updateUser(existUser.id, req.body);
  res.status(200).json({ updateUser });
});
