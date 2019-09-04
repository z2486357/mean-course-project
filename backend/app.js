const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) =>{
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message:'Post added successfully!'
  });
});


app.get("/api/posts", (req, res, next) => {
  const posts = [
    { id: "asdad", title: "1 server post", content: "from server -1" },
    { id: "qwdqd", title: "2 server post", content: "from server -2" },
    { id: "ewqeqwe", title: "3 server post", content: "from server -3" },
    { id: "ghsrht", title: "4 server post", content: "from server -4" },
    { id: "afcafa", title: "5 server post", content: "from server -5" }
  ];
  res.status(200).json({
    message: "Posts fetched successfully!",
    posts: posts
  });
});

module.exports = app;
