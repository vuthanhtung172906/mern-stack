const bcrypt = require("bcrypt");
const Products = require("../models/productModel");

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const query = req.query;
      if (Object.entries(query).length === 0) {
        const allproducts = await Products.find();
        res.json(allproducts);
      } else {
        const _limit = parseInt(query._limit);
        const _page = parseInt(query._page);
        const _q = query._q;
        const products =
          _q === ""
            ? await Products.find()
                .skip((_page - 1) * _limit)
                .limit(_limit)
            : await Products.find({
                $text: { $search: _q },
              })
                .skip((_page - 1) * _limit)
                .limit(_limit);

        const result = {
          body: products,
          pagination: {
            _page: _page,
            _limit: _limit,
          },
        };
        res.json(result);
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Products.findById(id);
      res.json(product);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  addProduct: async (req, res) => {
    try {
      const product = req.body;
      const newProducts = new Products({
        ...product,
      });
      await newProducts.save();
      return res.json({ msg: "Add product success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.body._id);
      return res.json("Delete Success");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      console.log(req.body);
      const newProduct = req.body;
      await Products.findByIdAndUpdate(req.body._id, {
        ...newProduct,
      });
      return res.json("Update success");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
