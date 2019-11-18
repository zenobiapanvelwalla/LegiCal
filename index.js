var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var session = require('express-session')
app.use(cors());
app.use(session({
    secret: 'LegiCal',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root123@ds119692.mlab.com:19692/legical', {useNewUrlParser: true, poolSize: 100 },function(err){
    if(err) throw err;
    console.log("Successfully connected to MongoDB");
});


app.options('*', cors());

//connect to cassandra

//route handlers
var user = require('./routes/user');
var login = require('./routes/login');
var logout = require('./routes/logout');
var bill = require('./routes/bill');
var senate = require('./routes/senate');
var org = require('./routes/org');

//routes
app.use('/user',user);
app.use('/login',login);
app.use('/logout',logout);
app.use('/bill',bill);
app.use('/senate', senate)
app.use('/org', org);

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    res.header('Access-Control-Allow-Credentials', true);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//serve on port 3000
app.listen(5000, () => {
    debugger;
    console.log("Server running on port 5000");
});
   
module.exports = app;