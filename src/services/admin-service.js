const prisma = require("../models/prisma");

exports.createProduct = (data) => prisma.product.create({ data });
exports.uploadMainImage = (data, id) =>
  prisma.product.update({ where: { id }, data });
exports.editProductById = (id, data) =>
  prisma.product.update({ data, where: { id } });
exports.deleteProductById = (id) => prisma.product.delete({ where: { id } });

// Admin order service

exports.findAllOrders = () =>
  prisma.order.findMany({ include: { payment: true } });

exports.findOrderById = (id) =>
  prisma.order.findFirst({
    where: { id },
    include: {
      orderItems: { include: { product: true } },
      payment: { select: { proofOfPayment: true } },
    },
  });

exports.updateOrderStatus = (id, data) =>
  prisma.order.update({ data, where: { id } });

exports.deleteOrder = (id) => prisma.order.delete({ where: { id } });

exports.createAdmin = (data) => prisma.user.create({ data });
