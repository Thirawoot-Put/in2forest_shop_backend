const prisma = require("../models/prisma");

exports.createOrder = (userId, addressId, totalPrice, itemsArray) => {
  return prisma.order.create({
    data: {
      userId,
      addressId,
      totalPrice,
      orderItems: {
        create: itemsArray,
      },
      payment: {
        create: { paymentTypeId: 1 },
      },
    },
  });
};

exports.soldOut = (id) =>
  prisma.product.updateMany({ data: { status: "SOLDOUT" }, where: { id } });

exports.deleteCart = (id) => prisma.cart.deleteMany({ where: { userId: id } });
