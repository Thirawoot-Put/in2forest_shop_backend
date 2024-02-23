const express = require("express");

const adminController = require("../controller/admin-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const adminPermission = require("../middlewares/admin-permission");
const {
  validateAdminRegister,
} = require("../middlewares/validators/auth-validator");
const {
  validateCreateProduct,
  validateEditProduct,
} = require("../middlewares/validators/product-validator");

const router = express.Router();

// product
router.post(
  "/product",
  upload.single("mainImage"),
  authenticate,
  adminPermission,
  validateCreateProduct,
  adminController.addProduct
);
router.patch(
  "/product/:productId",
  upload.single("mainImage"),
  authenticate,
  adminPermission,
  validateEditProduct,
  adminController.editProduct
);
router.delete(
  "/product/:productId",
  authenticate,
  adminPermission,
  adminController.removeProduct
);

// order
router.get(
  "/orders",
  authenticate,
  adminPermission,
  adminController.fetchAllOrders
);
router.get(
  "/orders/:orderId",
  authenticate,
  adminPermission,
  adminController.getOrderById
);
router.patch(
  "/orders/:orderId",
  authenticate,
  adminPermission,
  adminController.updateOrderStatus
);
router.delete(
  "/orders/:orderId",
  authenticate,
  adminPermission,
  adminController.deleteOrder
);

// admin register
router.post(
  "/register",
  validateAdminRegister,
  adminPermission,
  adminController.registerAdmin
);

module.exports = router;
