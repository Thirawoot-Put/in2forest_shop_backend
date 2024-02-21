const fs = require("fs/promises");

const catchError = require("../utils/catch-error");
const adminService = require("../services/admin-service");
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
    res.status(201).json({ newProduct });
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
