const catchError = require("../utils/catch-error");
const createError = require("../utils/create-error");

const adminPermission = catchError(async (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    createError("Not permission", 400);
  }
  next();
});

module.exports = adminPermission;
