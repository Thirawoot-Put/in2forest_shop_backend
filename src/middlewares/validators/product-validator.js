const Joi = require("joi");
const validate = require("./validator");

const createProduct = Joi.object({
  productName: Joi.string().trim().required(),
  size: Joi.string().trim().required(),
  productDetail: Joi.string().trim().allow(null, ""),
  defect: Joi.string().trim().allow(null, ""),
  price: Joi.number().required(),
  productTypeId: Joi.number().required(),
  //   mainImage: Joi.string().required(),
});

exports.validateCreateProduct = validate(createProduct);

const editProduct = Joi.object({
  productName: Joi.string().trim().required(),
  size: Joi.string().trim().required(),
  productDetail: Joi.string().trim().allow(null, ""),
  defect: Joi.string().trim().allow(null, ""),
  price: Joi.number().required(),
  productTypeId: Joi.number().required(),
});

exports.validateEditProduct = validate(editProduct);
