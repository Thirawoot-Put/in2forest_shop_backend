const catchError = require("../utils/catch-error");

const orderService = require("../services/order-service");
const productService = require("../services/product-service");
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
  const allProducts = await productService.getAllTypeAndDetail();
  res
    .status(201)
    .json({ message: "Create new order success", newOrder, allProducts });
});

exports.getAllUserOrders = catchError(async (req, res, next) => {
  const userOrders = await orderService.findAllUserOrders(req.user.id);
  res.status(200).json({ userOrders });
});

exports.getUserOrderById = catchError(async (req, res, next) => {
  const orderId = +req.params.orderId;
  const order = await orderService.findUserOrderDetail(orderId, req.user.id);
  if (order) {
    res.status(200).json({ order });
  }
  if (!order) {
    createError("Order not found", 400);
  }
});

exports.userDeleteOrder = catchError(async (req, res, next) => {
  const userId = req.user.id;
  const orderId = +req.params.orderId;
  const itemInOrder = await orderService.findUserOrderDetail(orderId, userId);
  for (let i = 0; i < itemInOrder.orderItems.length; i++) {
    await orderService.reOnSale(itemInOrder.orderItems[i].productId);
  }
  const deleteOrder = await orderService.deleteOrder(orderId);
  const allProducts = await productService.getAllTypeAndDetail();
  res.status(200).json({ deleteOrder, allProducts });
});
