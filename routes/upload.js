const uploadCtr = require("../controllers/uploadCtr");
const auth = require("../middleware/auth");
const uploadImage = require("../middleware/uploadImage");

const router = require("express").Router();

router.post("/upload_avatar", uploadImage, auth, uploadCtr.uploadAvatar);

module.exports = router;
