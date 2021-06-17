const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  port = process.env.PORT || 3070;
const path = require('path');
const http = require('http').createServer(app);

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
const hostname = '192.168.1.128';

http.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
app.get('/', (req, res) => {
	console.log("Connected");
})
app.use('/api/signin', require('./Controller/api-signin'));
app.use('/api/signup',require('./Controller/api-signup'));
app.use('/api/toy',require('./Controller/api-toy'));
app.use('/api/request',require('./Controller/api-request'));
app.use('/api/user',require('./Controller/api-user'));
