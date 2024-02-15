const prisma = require('../models/prisma');

exports.createProduct = data => prisma.product.create({ data });
exports.findProductById = id => prisma.product.findFirst({ where: { id } });
exports.editProductById = (id, data) => prisma.product.update({ data, where: { id } });
exports.deleteProductById = id => prisma.product.delete({ where: { id } })