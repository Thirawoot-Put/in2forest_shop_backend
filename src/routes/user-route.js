const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controller/user-controller");

const router = express.Router();

router.patch("/:userId", authenticate, userController.updateUserInfo);

module.exports = router;
