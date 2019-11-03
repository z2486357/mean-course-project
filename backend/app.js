const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// npm install --save express
// npm install --save body-parser
// npm install --save mongoose
// npm install --save nodemon
// npm install --save multer
// add "start:server" : "nodemon server.js" in package.json
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

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
app.use("/images",express.static(path.join("backend/images")));

// enable the communication between localhost:4200 and localhost:3000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports = app;
