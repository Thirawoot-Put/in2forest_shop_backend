const catchError = require('../utils/catch-error');
const creatError = require('../utils/create-error');
const adminService = require('../services/admin-service');
const uploadService = require('../services/upload-service');

exports.addProduct = catchError(async (req, res, next) => {
    const { price, productTypeId } = req.body
    const changeTypeData = { ...req.body, price: +price, productTypeId: +productTypeId }
    const newProduct = await adminService.createProduct(changeTypeData);
    const data = {};
    data.mainImage = await uploadService.upload(req.file.path)
    const uploadMainImg = await adminService.uploadMainImage(data, newProduct.id)
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

exports.getAllProductTypes = catchError(async (req, res, next) => {
    const allTypes = await adminService.getAllTypeProduct()
    res.status(200).json({ allTypes })
})

