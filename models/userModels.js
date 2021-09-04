const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please enter your name !"],
      trim: true,
    },
    email: {
      type: String,
      require: [true, "Please enter your email !"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please enter your password !"],
    },
    role: {
      type: Number,
      default: 0,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/tungvuthanh20172906/image/upload/v1628948405/user/%E1%BA%A2nh_%C4%91%C3%A3_ch%E1%BB%89nh_4_jkbhcx.jpg",
    },
    address: {
      type: Array,
      default: [],
    },
    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
