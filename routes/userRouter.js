const userCtrl = require("../controllers/userCtrl");
const authAdmin = require("../middleware/adminAuth");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activation);
router.post("/login", userCtrl.login);
router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/forgot", userCtrl.forgotPass);
router.post("/reset", auth, userCtrl.resetPass);
router.get("/infor", auth, userCtrl.getInforUser);
router.get("/get_all_users", auth, authAdmin, userCtrl.getAllUsers);
router.post("/logout", userCtrl.logOut);
router.patch("/update", auth, userCtrl.updateInfor);
router.patch("/update_address", auth, userCtrl.updateAdress);
router.patch("/update_role/:id", auth, authAdmin, userCtrl.updateUserRole);
router.delete("/delete/:id", auth, authAdmin, userCtrl.deleteUser);
router.patch("/change_password", auth, userCtrl.changePass);
router.patch("/add_to_cart", auth, userCtrl.addCart);

/// Social Login

router.post("/google_login", userCtrl.googleLogin);
router.post("/facebook_login", userCtrl.facebookLogin);

module.exports = router;
