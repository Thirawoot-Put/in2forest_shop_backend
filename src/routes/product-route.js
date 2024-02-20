const express = require("express");

const productController = require("../controller/product-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.get("/types", productController.getAllProductTypes);
router.get("/", productController.getAllProduct);
router.get("/products-types", productController.getAllTypeAndDetail);
router.get("/:productId", productController.getProductById);

module.exports = router;
