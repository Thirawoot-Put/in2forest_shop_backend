const express = require("express");

const upload = require("../middlewares/upload");
const paymentController = require("../controller/payment-controller");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.patch(
  "/:orderId",
  upload.single("proofOfPayment"),
  authenticate,
  paymentController.uploadPaySlip
);

module.exports = router;
