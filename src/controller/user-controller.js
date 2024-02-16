const catchError = require("../utils/catch-error")
const userService = require('../services/user-service')

exports.getAllProductTypes = catchError(async (req, res, next) => {
    const allTypes = await userService.getAllTypeProduct()
    res.status(200).json({ allTypes })
})

exports.getAllProduct = catchError(async (req, res, next) => {
    const allProduct = await userService.getAllProduct()
    res.status(200).json({ allProduct })
})

exports.getProductById = catchError(async (req, res, next) => {
    const productId = +req.params.productId
    const oldData = await userService.findProductById(productId);
    res.status(200).json({ oldData })
})

exports.getAllTypeAndDetail = catchError(async (req, res, next) => {
    const typesWithProducts = await userService.getAllTypeAndDetail()
    res.status(200).json({ typesWithProducts })
})