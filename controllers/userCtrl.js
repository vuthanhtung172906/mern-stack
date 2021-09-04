const bcrypt = require("bcrypt");
const Users = require("../models/userModels");
const jwt = require("jsonwebtoken");
const sendEmail = require("./sendMail");
const { json } = require("body-parser");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const fetch = require("node-fetch");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { email, username, password } = req.body;

      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "This email is already exits." });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = {
        email: email,
        name: username,
        password: passwordHash,
      };
      const activation_token = createActivationToken(newUser);
      console.log({ newUser, activation_token });
      const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
      sendEmail(email, url);
      res.json({
        msg: "Register Success! Please activate account in your email",
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  activation: async (req, res) => {
    try {
      const { activation_token } = req.body;
      console.log(activation_token);

      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { name, email, password } = user;
      const checkUser = await Users.findOne({ email });
      if (checkUser) return res.json({ msg: "Email is already exists" });
      const newUser = new Users({
        name,
        email,
        password,
      });
      await newUser.save();
      return res.json({ msg: "Account is activated. Please Log In" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.json({ msg: "Email isn't registered" });
      const checkPassword = await bcrypt.compare(password, user.password);
      console.log({ user });
      if (!checkPassword) return res.json({ msg: "Password isn't incorrect" });
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        path: `/user/refresh_token`,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ msg: "Login success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAccessToken: async (req, res) => {
    try {
      console.log(req.cookies);
      const refreshToken = req.cookies.refreshtoken;
      if (!refreshToken)
        return res.status(400).json({ msg: "Please login now" });
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) return res.status(400).json({ msg: "Please login now" });
          console.log({ user });
          const accessToken = createAccessToken({ id: user.id });
          res.json({ accessToken });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  forgotPass: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Email isn't registered" });
      const access_token = createAccessToken({ id: user._id });
      const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;
      sendEmail(email, url);

      res.json({ msg: "Re-send the password. please check your email" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  changePass: async (req, res) => {
    try {
      console.log(req.body);
      const { oldPassword, newPassword } = req.body;
      const user = await Users.findById(req.user.id);
      const checkPassword = await bcrypt.compare(oldPassword, user.password);
      if (!checkPassword) return res.json({ msg: "Old password is incorrect" });
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      return res.json({ msg: "Please log-in with new password" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  resetPass: async (req, res) => {
    try {
      console.log(req.body);
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      return res.json({ msg: "Please log-in with new password" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getInforUser: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await Users.find().select("-password");
      res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  logOut: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged Out " });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateInfor: async (req, res) => {
    try {
      const { name, avatar } = req.body;
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar,
        }
      );
      res.json({ msg: "Update Success" });
    } catch (error) {
      return res.status(500).json({});
    }
  },
  updateAdress: async (req, res) => {
    try {
      const address = req.body;
      await Users.findByIdAndUpdate(
        {
          _id: req.user.id,
        },
        {
          address: address,
        }
      );
      res.json({ msg: "Update Success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const { role } = req.body;
      await Users.findByIdAndUpdate(
        { _id: req.params.id },
        {
          role,
        }
      );
      return res.json({ msg: "Update role user success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      await Users.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Delete user success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addCart: async (req, res) => {
    try {
      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json(req.body.cart);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  googleLogin: async (req, res) => {
    try {
      const { token_id } = req.body;
      const verify = await client.verifyIdToken({
        idToken: token_id,
        audience: process.env.MAILING_SERVICE_CLIENT_ID,
      });
      const { email_verified, name, email, picture } = verify.payload;
      const password = email + process.env.GOOGLEHASH;
      const passwordHash = await bcrypt.hash(password, 12);
      if (!email_verified)
        return res.status(400).json({ msg: "Password is incorrect" });
      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success" });
      } else {
        const newUser = new Users({
          name,
          email,
          password: passwordHash,
          avatar: picture,
        });
        await newUser.save();
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  facebookLogin: async (req, res) => {
    try {
      const { accessToken, userID } = req.body;

      const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;
      const data = await fetch(URL)
        .then((res) => res.json())
        .then((res) => {
          return res;
        });
      console.log({ data });
      const { name, email, picture } = data;
      const password = email + process.env.GOOGLEHASH;
      const passwordHash = await bcrypt.hash(password, 12);
      const user = await Users.findOne({ email });
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Password is incorrect" });
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success" });
      } else {
        const newUser = new Users({
          name,
          email,
          password: passwordHash,
          avatar: picture.data.url,
        });
        await newUser.save();
        const refresh_token = createRefreshToken({ id: user._id });
        res.cookie("refreshtoken", refresh_token, {
          httpOnly: true,
          path: "/user/refresh_token",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.json({ msg: "Login success" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
function createActivationToken(payload) {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
}
function createAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "20m",
  });
}
function createRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}
module.exports = userCtrl;
