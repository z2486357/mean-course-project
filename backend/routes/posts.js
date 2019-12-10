const express = require('express');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const postControllers = require("../controllers/posts")
const router = express.Router();



router.post("", checkAuth,extractFile ,postControllers.createPost);

router.get("", postControllers.getPosts);

router.put("/:id", checkAuth,extractFile,postControllers.updatePost );

router.get("/:id", postControllers.getPostById)

router.delete("/:id", checkAuth, postControllers.deletePost);

module.exports = router;
