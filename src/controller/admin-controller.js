const catchError = require('../utils/catch-error');
const creatError = require('../utils/create-error');
const adminService = require('../services/admin-service');

exports.addProduct = catchError(async (req, res, next) => {
    const newProduct = await adminService.createProduct(req.body);
    console.log(req.body)
    res.status(201).json({ newProduct });
});

exports.editProduct = catchError(async (req, res, next) => {
    const productId = +req.params.productId
    const product = await adminService.findProductById(productId);
    if (!product) {
        res.status(400).json({ message: "Product not found" })
    }
    const editProduct = await adminService.editProductById(productId, req.body)
    res.status(200).json({ editProduct });
});

exports.removeProduct = catchError(async (req, res, next) => {
    const productId = +req.params.productId;
    const product = await adminService.findProductById(productId);
    if (!product) {
        res.status(400).json({ message: "Product not found" })
    }
    const deletedProduct = await adminService.deleteProductById(productId);
    res.status(200).json({ message: 'Delete success', deletedProduct })
})

