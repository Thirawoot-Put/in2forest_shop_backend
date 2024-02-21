const express = require("express");
const authenticate = require("../middlewares/authenticate");
const orderController = require("../controller/order-controller");
const adminController = require("../controller/admin-controller");

const router = express.Router();

router.post("/", authenticate, orderController.addNewOrder);
router.get("/", authenticate, orderController.getAllUserOrders);

// Admin order route
router.get("/admin", authenticate, adminController.fetchAllOrders);

module.exports = router;
