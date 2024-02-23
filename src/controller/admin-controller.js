const fs = require("fs/promises");

const catchError = require("../utils/catch-error");
const adminService = require("../services/admin-service");
const userService = require("../services/user-service");
const hashService = require("../services/hash-service");
const uploadService = require("../services/upload-service");
const updateController = require("../utils/update-controller");
const productService = require("../services/product-service");
const createError = require("../utils/create-error");

exports.addProduct = async (req, res, next) => {
  try {
    const { price, productTypeId } = req.body;
    const changeTypeData = {
      ...req.body,
      price: +price,
      productTypeId: +productTypeId,
    };
    const newProduct = await adminService.createProduct(changeTypeData);
    const data = {};
    data.mainImage = await uploadService.upload(req.file.path);
    updateController(adminService.uploadMainImage, data, newProduct.id);
    const allProducts = await productService.getAllTypeAndDetail();
    res.status(201).json({ newProduct, allProducts });
  } catch (err) {
    createError(err.message);
  } finally {
    fs.unlink(req.file.path);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const productId = +req.params.productId;
    const product = await productService.findProductById(productId);
    if (!product) {
      res.status(400).json({ message: "Product not found" });
    }
    const { price, productTypeId } = req.body;
    const changeTypeData = {
      ...req.body,
      price: +price,
      productTypeId: +productTypeId,
    };
    const editProduct = await adminService.editProductById(
      productId,
      changeTypeData
    );
    if (req.file) {
      const data = {};
      data.mainImage = await uploadService.upload(req.file.path);
      updateController(adminService.uploadMainImage, data, editProduct.id);
    }
    res.status(200).json({ editProduct });
  } catch (error) {
    console.log(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.removeProduct = catchError(async (req, res, next) => {
  const productId = +req.params.productId;
  const product = await productService.findProductById(productId);
  if (!product) {
    res.status(400).json({ message: "Product not found" });
  }
  const deletedProduct = await adminService.deleteProductById(productId);
  res.status(200).json({ message: "Delete success", deletedProduct });
});

// Admin order controller

exports.fetchAllOrders = catchError(async (req, res, nex) => {
  const orders = await adminService.findAllOrders();
  res.status(200).json({ orders });
});

exports.getOrderById = catchError(async (req, res, next) => {
  const orderId = +req.params.orderId;
  const order = await adminService.findOrderById(orderId);
  if (order) {
    res.status(200).json({ order });
  }
  if (!order) {
    createError("Order not found", 400);
  }
});

exports.updateOrderStatus = catchError(async (req, res, next) => {
  const orderId = +req.params.orderId;
  console.log(req.body);
  const updatedOrder = await adminService.updateOrderStatus(orderId, req.body);
  res.status(200).json({ updatedOrder });
});

exports.deleteOrder = catchError(async (req, res, next) => {
  const orderId = +req.params.orderId;
  const deleteOrder = await adminService.deleteOrder(orderId);
  res.status(200).json({ deleteOrder });
});

// admin register
exports.registerAdmin = catchError(async (req, res, next) => {
  if (req.body.adminCode !== "ADMIN") {
    createError("admin_code_not_correct", 400);
  }
  const newData = { ...req.body, role: process.env.ADMIN_SECRET };
  delete newData.adminCode;
  const existUser = await userService.findUserByEmail(req.body.email);
  if (existUser) {
    createError("email_already_use", 400);
  }
  newData.password = await hashService.hash(req.body.password);
  console.log(newData);
  const newUser = await userService.createUser(newData);
  // const payload = {
  //   userId: newUser.id,
  //   firstName: newUser.firstName,
  //   lastName: newUser.lastName,
  // };
  // const accessToken = jwtService.sign(payload);
  delete newUser.password;

  res.status(201).json({ newUser });
});
