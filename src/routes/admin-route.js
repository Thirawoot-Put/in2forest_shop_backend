const express = require('express');

const adminController = require('../controller/admin-controller');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/product', upload.single('mainImage'), adminController.addProduct);
router.patch('/product/:productId', upload.single('mainImage'), adminController.editProduct);
router.delete('/product/:productId', adminController.removeProduct);
router.get('/product/types', adminController.getAllProductTypes);
router.get('/product', adminController.getAllProduct);
router.get('/product/:productId', adminController.getProductById)

module.exports = router;