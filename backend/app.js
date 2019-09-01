const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: "asdad", title: "1 server post", content: "from server" },
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
