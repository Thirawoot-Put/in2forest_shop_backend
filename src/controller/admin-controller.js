const fs = require('fs/promises');

const catchError = require('../utils/catch-error');
const creatError = require('../utils/create-error');
const adminService = require('../services/admin-service');
const uploadService = require('../services/upload-service');
const updateController = require('../utils/update-controller');

exports.addProduct = async (req, res, next) => {
    try {
        const { price, productTypeId } = req.body
        const changeTypeData = { ...req.body, price: +price, productTypeId: +productTypeId }
        const newProduct = await adminService.createProduct(changeTypeData);
        const data = {};
        data.mainImage = await uploadService.upload(req.file.path)
        updateController(adminService.uploadMainImage, data, newProduct.id)
        res.status(201).json({ newProduct });
    } catch (err) {
        throw new Error(err.message);
    } finally {
        fs.unlink(req.file.path);
    }
};

exports.editProduct = async (req, res, next) => {
    try {
        const productId = +req.params.productId
        const product = await adminService.findProductById(productId);
        if (!product) {
            res.status(400).json({ message: "Product not found" })
        }
        const { price, productTypeId } = req.body
        const changeTypeData = { ...req.body, price: +price, productTypeId: +productTypeId }
        const editProduct = await adminService.editProductById(productId, changeTypeData)
        if (req.file) {
            const data = {};
            data.mainImage = await uploadService.upload(req.file.path)
            updateController(adminService.uploadMainImage, data, editProduct.id)
        }
        res.status(200).json({ editProduct });
    } catch (error) {
        console.log(error)
    } finally {
        if (req.file) {
            fs.unlink(req.file.path);
        }
    }
};

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

exports.getAllProduct = catchError(async (req, res, next) => {
    const allProduct = await adminService.getAllProduct()
    res.status(200).json({ allProduct })
})

exports.getProductById = catchError(async (req, res, next) => {
    const productId = +req.params.productId
    const oldData = await adminService.findProductById(productId);
    res.status(200).json({ oldData })
})