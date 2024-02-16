const express = require('express');

const userController = require('../controller/user-controller')
const upload = require('../middlewares/upload');

const router = express.Router()

router.get('/types', userController.getAllProductTypes);
router.get('/product', userController.getAllProduct);
router.get('/product/types', userController.getAllTypeAndDetail);
router.get('/product/:productId', userController.getProductById)

module.exports = router