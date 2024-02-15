const express = require('express');

const adminController = require('../controller/admin-controller');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/product', upload.single('mainImage'), adminController.addProduct);
// router.patch('/product', adminController.uploadMainImage);
router.patch('/product/:productId', adminController.editProduct);
router.delete('/product/:productId', adminController.removeProduct);
router.get('/product/types', adminController.getAllProductTypes);

module.exports = router;