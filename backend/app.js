const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// npm install --save express
// npm install --save body-parser
// npm install --save mongoose
// npm install --save nodemon
// add "start:server" : "nodemon server.js" in package.json
const Post = require('./models/post');

const app = express();

//mongodb user and password
//mongouser:password
mongoose.connect("mongodb+srv://mongouser:leXhc3AF3adBpEtJ@cluster0-iihgu.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log("connect to database!");
  })
  .catch((error) => {
    console.log("connection failed");
    console.log(error)
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false})); // no use right now

// enable the communication between localhost:4200 and localhost:3000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  //console.log(post);
  post.save().then(
    (createedPost) => {
      //console.log(result);
      res.status(201).json({
        message: 'Post added successfully!',
        postId: createedPost._id,
      });
    }
  );

});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    //console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });

});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });
  Post.updateOne({ _id: req.params.id }, post).then((result) => {
    //console.log(result);
    res.status(200).json({ message: "Post updated!" });
  })
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.findById(req.params.id).then((post) => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(400).json({ message: "Post not found!" });
    }
  })
})

app.delete("/api/posts/:id", (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    //console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  })
});

module.exports = app;
