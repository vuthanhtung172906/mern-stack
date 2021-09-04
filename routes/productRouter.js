const productCtrl = require("../controllers/productCtrl");
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth");
const uploadImage = require("../middleware/uploadImage");
const router = require("express").Router();

router.get("/", productCtrl.getProducts);
router.get("/:id", productCtrl.getProduct);
router.post("/", uploadImage, productCtrl.addProduct);
router.post("/delete", productCtrl.deleteProduct);
router.post("/update", uploadImage, productCtrl.updateProduct);
module.exports = router;
