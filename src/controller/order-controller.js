const catchError = require("../utils/catch-error");

const orderService = require("../services/order-service");
const cartService = require("../services/cart-service");
const createError = require("../utils/create-error");

exports.addNewOrder = catchError(async (req, res, next) => {
  const addressId = req.body.addressId;
  const userId = req.user.id;
  const itemInCart = await cartService.findAllCart(userId);
  if (itemInCart.length <= 0) {
    createError("Cart is empty", 400);
  }
  const itemsArray = itemInCart.map((item) => ({
    productId: item.productId,
    productName: item.productName,
    productPrice: item.productPrice,
  }));
  const totalPrice = itemsArray.reduce((acc, cur) => acc + cur.productPrice, 0);
  const newOrder = await orderService.createOrder(
    userId,
    addressId,
    totalPrice,
    itemsArray
  );
  for (let i = 0; i < itemsArray.length; i++) {
    await orderService.soldOut(itemsArray[i].productId);
  }
  const deleteCart = await orderService.deleteCart(userId);
  res.status(201).json({ message: "Create new order success", newOrder });
});
