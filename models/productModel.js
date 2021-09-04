const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    index: true,
  },
  description: {
    type: String,
    require: true,
    index: true,
  },
  countInStock: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
});
productSchema.index({ name: "text", description: "text" });
module.exports = mongoose.model("Products", productSchema);
