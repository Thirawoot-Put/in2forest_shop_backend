const prisma = require("../models/prisma");

exports.findProductById = (id) => prisma.product.findFirst({ where: { id } });
exports.getAllTypeProduct = () => prisma.productType.findMany();
exports.getAllProduct = () =>
  prisma.product.findMany({ where: { status: "ONSALE" } });
exports.getAllTypeAndDetail = () =>
  prisma.productType.findMany({
    include: { products: { where: { status: "ONSALE" } } },
  });
