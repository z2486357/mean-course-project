const express = require('express');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const postControllers = require("../controllers/posts")
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    callback(error, "backend/images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post("", checkAuth, multer({ storage: storage }).single("image"),postControllers.createPost);

router.get("", postControllers.getPosts);

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"),postControllers.updatePost );

router.get("/:id", postControllers.getPostById)

router.delete("/:id", checkAuth, postControllers.deletePost);

module.exports = router;
