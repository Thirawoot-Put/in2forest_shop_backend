const prisma = require('../models/prisma');

exports.findUserByEmail = email => prisma.user.findFirst({ where: { email: email } });

exports.createUser = data => prisma.user.create({ data });

exports.findUserById = userId => prisma.user.findFirst({ where: { id: userId } });

exports.findProductById = id => prisma.product.findFirst({ where: { id } });
exports.getAllTypeProduct = () => prisma.productType.findMany();
exports.getAllProduct = () => prisma.product.findMany({ where: { status: 'ONSALE' } })

exports.getAllTypeAndDetail = () => prisma.productType.findMany({ include: { products: true } });