const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../controller/user-controller");

const router = express.Router();

router.patch("/:userId", authenticate, userController.updateUserInfo);
router.post("/address", authenticate, userController.addAddress);
router.get("/address/:userId", authenticate, userController.getAddresses);

module.exports = router;
