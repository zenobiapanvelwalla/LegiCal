var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var session = require('express-session')
app.use(session({
    secret: 'LegiCal',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
//https://github.com/expressjs/session


debugger;
//connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root123@ds119692.mlab.com:19692/legical', {useNewUrlParser: true, poolSize: 100 },function(err){
    if(err) throw err;
    console.log("Successfully connected to MongoDB");
});


//route handlers
var user = require('./routes/user');
var login = require('./routes/login');
var logout = require('./routes/logout');

//routes
app.use('/user',user);
app.use('/login',login);
app.use('/logout',logout);
//tester
app.get("/", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


//serve on port 3000
app.listen(3000, () => {
    debugger;
    console.log("Server running on port 3000");
});
   
module.exports = app;