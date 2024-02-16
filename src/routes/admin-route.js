const express = require('express');

const adminController = require('../controller/admin-controller');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post('/product', upload.single('mainImage'), adminController.addProduct);
router.patch('/product/:productId', upload.single('mainImage'), adminController.editProduct);
router.delete('/product/:productId', adminController.removeProduct);

module.exports = router;