const express = require("express");

const productController = require("../controller/product-controller");
const upload = require("../middlewares/upload");
const authenticate = require("../middlewares/authenticate");
const adminPermission = require("../middlewares/admin-permission");

const router = express.Router();

router.get("/types", productController.getAllProductTypes);
router.get("/products-types", productController.getAllTypeAndDetail);
router.get("/:productId", productController.getProductById);
router.get("/", authenticate, adminPermission, productController.getAllProduct);

module.exports = router;
