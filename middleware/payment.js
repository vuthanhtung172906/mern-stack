const Payments = require("../models/paymentModel");
const Users = require("../models/userModels");

const payment = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    const { _id, name, email } = user;
    const { address, cart, typePay, total } = req.body;
    const newPayment = {
      name_id: _id,
      name,
      email,
      address,
      cart,
      typePay,
      total,
    };
    const newpayment = new Payments(newPayment);
    await newpayment.save();
    req.payment = newpayment;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = payment;
