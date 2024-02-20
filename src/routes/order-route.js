const express = require("express");
const authenticate = require("../middlewares/authenticate");
const orderController = require("../controller/order-controller");

const router = express.Router();

router.post("/", authenticate, orderController.addNewOrder);

module.exports = router;
