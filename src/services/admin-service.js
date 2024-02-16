const prisma = require('../models/prisma');

exports.createProduct = data => prisma.product.create({ data });
exports.uploadMainImage = (data, id) => prisma.product.update({ where: { id }, data })
exports.editProductById = (id, data) => prisma.product.update({ data, where: { id } });
exports.deleteProductById = id => prisma.product.delete({ where: { id } })