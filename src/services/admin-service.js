const prisma = require('../models/prisma');

exports.createProduct = data => prisma.product.create({ data });
exports.uploadMainImage = (data, id) => prisma.product.update({ where: { id }, data })
exports.findProductById = id => prisma.product.findFirst({ where: { id } });
exports.editProductById = (id, data) => prisma.product.update({ data, where: { id } });
exports.deleteProductById = id => prisma.product.delete({ where: { id } })
exports.getAllTypeProduct = () => prisma.productType.findMany();
exports.getAllProduct = () => prisma.product.findMany({ where: { status: 'ONSALE' } })