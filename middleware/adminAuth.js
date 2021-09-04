const jwt = require("jsonwebtoken");
const Users = require("../models/userModels");

const authAdmin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ _id: req.user.id });
    console.log({ user });
    if (!user.role) return res.status(500).json({ msg: "No access denied" });

    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = authAdmin;
