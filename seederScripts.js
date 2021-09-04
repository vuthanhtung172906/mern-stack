const mongoose = require("mongoose");
require("dotenv").config({
  path: "./configs/config.env",
});
const Products = require("./models/productModel");
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);
const productsData = require("./product");

const importData = async () => {
  try {
    await Products.deleteMany({});
    await Products.insertMany(productsData);
    console.log("Data import success");
    process.exit();
  } catch (error) {
    console.log("Import data fail");
    process.exit();
  }
};
importData();
