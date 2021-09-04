const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    name_id: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: Object,
      require: true,
    },
    cart: {
      type: Array,
      require: true,
    },
    total: {
      type: Number,
      require: true,
    },
    typePay: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payments", paymentSchema);
