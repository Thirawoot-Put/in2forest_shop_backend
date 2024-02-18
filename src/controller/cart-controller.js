const catchError = require("../utils/catch-error");
const cartService = require("../services/cart-service");
const createError = require("../utils/create-error");

exports.addToCart = catchError(async (req, res, next) => {
  const availInCart = await cartService.findAvailInUserCart(
    req.body.productId,
    req.body.userId
  );
  if (availInCart) {
    return createError("This product has already in cart", 400);
  }
  const newInCart = await cartService.createCart(req.body);
  res.status(201).json({ newInCart });
});

exports.getAllInCart = catchError(async (req, res, next) => {
  const allInCart = await cartService.findAllInCart(req.user.id);
  res.status(200).json({ allInCart });
});

exports.deleteFromCart = catchError(async (req, res, next) => {
  const targetId = +req.params.cartId;
  const validItem = await cartService.findByCartId(targetId);
  if (!validItem) {
    res.status(400).json({ message: "Item not found" });
  }
  const deleteItem = await cartService.removeFromCart(targetId);
  res.status(200).json({ message: "Delete item in cart success", deleteItem });
});
