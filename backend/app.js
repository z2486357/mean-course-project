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
  post.save();
  res.status(201).json({
    message: 'Post added successfully!'
  });
});



app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents)=>{
    //console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents,
    });
  });

});

module.exports = app;
