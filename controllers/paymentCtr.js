const dateFormat = require("dateformat");
const Payments = require("../models/paymentModel");

const querystring = require("qs");
var crypto = require("crypto");
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
const paymentCtr = {
  paymentRequest: async (req, res) => {
    try {
      const { total, _id } = req.payment;
      const date = new Date();
      const createDate = dateFormat(date, "yyyymmddHHmmss");
      const tmnCode = "TE1AU40S";
      const secretKey = "LOUSLBDSZHSWBBVPAMOGMWDZHHHADWSY";
      let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
      var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      const params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: "TE1AU40S",
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: dateFormat(date, "HHmmss"),
        vnp_OrderInfo: _id,
        vnp_OrderType: 200001,
        vnp_Amount: total * 100,
        vnp_ReturnUrl: "http://localhost:3000/user/payment_result",
        vnp_IpAddr: "127.0.0.1",
        vnp_CreateDate: createDate,
      };
      vnp_Params = sortObject(params);
      var signData = querystring.stringify(vnp_Params, { encode: false });
      var crypto = require("crypto");
      var hmac = crypto.createHmac("sha512", secretKey);
      var signed = hmac
        .update(new Buffer.from(signData, "utf-8"))
        .digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
      return res.json({ msg: vnpUrl });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  editStatus: async (req, res) => {
    try {
      const { paymentID, status } = req.body;
      if (status === "00") {
        await Payments.findByIdAndUpdate(paymentID, {
          status: true,
        });
      }
      return res.json({ msg: "Thanh toan thanh cong" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getOrderHistory: async (req, res) => {
    try {
      const userId = req.user.id;
      const paymentlist = await Payments.find({
        name_id: userId,
      });
      return res.json(paymentlist);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createPayPaid: async (req, res) => {
    try {
      return res.json({
        msg: "Đặt hàng thành công. Vui lòng kiểm tra lại trong lịch sử đơn hàng",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllOrder: async (req, res) => {
    try {
      const paymentlist = await Payments.find({});
      return res.json(paymentlist);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = paymentCtr;
