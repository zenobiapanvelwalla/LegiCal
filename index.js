var express = require("express");
var app = express();
var path = require('path');
var bodyParese = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect to mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root123@ds119692.mlab.com:19692/legical', {useNewUrlParser: true, poolSize: 100 },function(err){
    if(err) throw err;
    console.log("Successfully connected to MongoDB");
});


//route handlers
var waitTimes = require('./routes/wait-times');

//routes
app.use('/insert-wait-times',waitTimes);
//tester
app.get("/", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});


//serve on port 3000
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
   
module.exports = app;