const prisma = require("../models/prisma");

exports.findUserByEmail = (email) =>
  prisma.user.findFirst({ where: { email: email } });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (userId) =>
  prisma.user.findFirst({ where: { id: userId } });

exports.updateUser = (id, data) => prisma.user.update({ data, where: { id } });
