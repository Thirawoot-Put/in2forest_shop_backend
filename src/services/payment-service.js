const prisma = require("../models/prisma");

exports.uploadPaymentSlip = (id, data) =>
  prisma.payment.update({ data, where: { orderId: id } });

exports.findPayment = (id) =>
  prisma.payment.findFirst({ where: { orderId: id } });
