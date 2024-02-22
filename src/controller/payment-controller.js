const fs = require("fs/promises");

const paymentService = require("../services/payment-service");
const uploadService = require("../services/upload-service");
const orderService = require("../services/order-service");
const updateController = require("../utils/update-controller");

exports.uploadPaySlip = async (req, res, next) => {
  try {
    const orderId = +req.params.orderId;
    const payment = await paymentService.findPayment(orderId);
    if (!payment) {
      res.status(400).json({ message: "Transaction not found" });
    }
    if (!req.file) {
      res.status(400).json({ message: "Payment slip is required" });
    }
    const data = {};
    data.proofOfPayment = await uploadService.upload(req.file.path);
    const paymentUpdate = await updateController(
      paymentService.uploadPaymentSlip,
      orderId,
      data
    );
    const userOrders = await orderService.findAllUserOrders(req.user.id);
    res
      .status(200)
      .json({ message: "Upload success", paymentUpdate, userOrders });
  } catch (error) {
    console.log(error);
  } finally {
    fs.unlink(req.file.path);
  }
};
