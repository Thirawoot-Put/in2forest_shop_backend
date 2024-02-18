const express = require("express");
const authenticate = require("../middlewares/authenticate");
const cartController = require("../controller/cart-controller");

const router = express.Router();

router.post("/", authenticate, cartController.addToCart);
router.delete("/:cartId", authenticate, cartController.deleteFromCart);
router.get("/", authenticate, cartController.getAllInCart);

module.exports = router;
