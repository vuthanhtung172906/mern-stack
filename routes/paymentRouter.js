const router = require("express").Router();
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth");
const payment = require("../middleware/payment");
const paymentCtr = require("../controllers/paymentCtr");
router.post("/request", auth, payment, paymentCtr.paymentRequest);
router.patch("/status", auth, paymentCtr.editStatus);
router.get("/order_history", auth, paymentCtr.getOrderHistory);
router.post("/createPayPaid", auth, payment, paymentCtr.createPayPaid);
router.get("/getAllOrder", auth, authAdmin, paymentCtr.getAllOrder);

module.exports = router;
