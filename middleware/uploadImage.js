const fs = require("fs");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = async (req, res, next) => {
  try {
    if (req.body.file) {
      req.body.imageUrl = req.body.file;
      next();
    } else {
      if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ msg: "No file was uploaded" });
      const file = req.files.file;
      if (file.size > 1024 * 1024 * 10) {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          msg: "Size file too large",
        });
      }
      if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
        removeTmp(file.tempFilePath);
        return res.status(400).json({
          msg: "Please choose an image",
        });
      }
      cloudinary.v2.uploader.upload(
        file.tempFilePath,
        {
          folder: "products",
        },
        async (err, result) => {
          if (err) throw err;
          removeTmp(file.tempFilePath);
          console.log(req.body);
          req.body.imageUrl = result.secure_url;
          next();
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
