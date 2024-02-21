const catchError = require("../utils/catch-error");
const productService = require("../services/product-service");

exports.getAllProductTypes = catchError(async (req, res, next) => {
  const allTypes = await productService.getAllTypeProduct();
  res.status(200).json({ allTypes });
});

exports.getAllProduct = catchError(async (req, res, next) => {
  const allProduct = await productService.getAllProduct();
  res.status(200).json({ allProduct });
});

exports.getProductById = catchError(async (req, res, next) => {
  const productId = +req.params.productId;
  const productById = await productService.findProductById(productId);
  res.status(200).json({ productById });
});

exports.getAllTypeAndDetail = catchError(async (req, res, next) => {
  const typesWithProducts = await productService.getAllTypeAndDetail();
  res.status(200).json({ typesWithProducts });
});
