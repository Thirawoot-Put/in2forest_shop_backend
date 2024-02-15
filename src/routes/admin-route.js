const express = require('express');

const adminController = require('../controller/admin-controller');

const router = express.Router();

router.post('/product', adminController.addProduct);
router.patch('/product/:productId', adminController.editProduct);
router.delete('/product/:productId', adminController.removeProduct)

module.exports = router;