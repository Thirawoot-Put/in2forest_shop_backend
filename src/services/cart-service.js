const prisma = require("../models/prisma");

exports.createCart = (data) => prisma.cart.create({ data });
exports.findByCartId = (id) => prisma.cart.findFirst({ where: { id } });
exports.findAvailInUserCart = (productId, userId) =>
  prisma.cart.findFirst({ where: { AND: [{ productId }, { userId }] } });
exports.findAllInCart = (id) =>
  prisma.cart.findMany({ where: { userId: id }, include: { product: true } });
exports.removeFromCart = (id) => prisma.cart.delete({ where: { id } });
