const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

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

router.post("", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
  });
  //console.log(req.userData);
  //return res.status(200).json({});
  //console.log(post);
  post.save().then(
    (createedPost) => {
      //console.log(result);
      res.status(201).json({
        message: 'Post added successfully!',
        post: {
          ...createedPost, // copy all
          id: createedPost._id, // change id
        }
      });
    }
  ).catch(error => {
    res.status(500).json({
      message: "Created a post failed!"
    })
  });

});

router.get("", (req, res, next) => {
  //console.log(req.query);
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  const postQuery = Post.find();
  let fetechedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then((documents) => {
    //console.log(documents);
    fetechedPosts = documents;
    return Post.count();
  }).then((count) => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetechedPosts,
      maxPosts: count,
    });
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    })
  });

});

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
  let imagePath = req.body.imagePath;
  //console.log(imagePath)
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then((result) => {
    //console.log(result);
    if (result.nModified > 0) {
      res.status(200).json({ message: "Post updated!" });
    } else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Couldn't update post!"
    })
  })
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: "Post not found!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Fetching post failed!"
    })
  })
})

router.delete("/:id", checkAuth, (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then((result) => {
    console.log(result);
    if (result.n > 0) {
      res.status(200).json({ message: "Post deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!" });
    }
  }).catch(error => {
    res.status(500).json({
      message: "Delete post failed!"
    })
  })
});

module.exports = router;
