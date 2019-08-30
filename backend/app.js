const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('111111111111111');
});

app.use((req, res, next) => {
  res.send('expresssssssssss');
});

module.exports = app;
