const express = require("express");

const adminController = require("../controller/admin-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const {
  validateAdminRegister,
} = require("../middlewares/validators/auth-validator");

const router = express.Router();

router.post("/product", upload.single("mainImage"), adminController.addProduct);
router.patch(
  "/product/:productId",
  upload.single("mainImage"),
  adminController.editProduct
);
router.delete("/product/:productId", adminController.removeProduct);

// order
router.get("/orders", authenticate, adminController.fetchAllOrders);
router.get("/orders/:orderId", authenticate, adminController.getOrderById);
router.patch(
  "/orders/:orderId",
  authenticate,
  adminController.updateOrderStatus
);
router.delete("/orders/:orderId", authenticate, adminController.deleteOrder);

// admin register
router.post("/register", validateAdminRegister, adminController.registerAdmin);

module.exports = router;
