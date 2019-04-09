var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let User = require('../schemas/UserSchema');


var response = {
    statusCode:200,
    message:""
};

router.post('/register', function(req, res, next) {
    console.log("Inserting User");
    
    
    var userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password:req.body.password,
        streetAddress:req.body.streetAddress,
        city:req.body.city,
        state:req.body.state,
        zipcode:req.body.zipcode,
        organizationCode:req.body.organizationCode
      }
      //use schema.create to insert data into the db
      User.create(userData, function (err, user) {
        if (err) {
            response.message = err;
            response.statusCode = 500;
            return res.send(response);
          
        } else {
            response.message = "User Created"; 
            return res.send(response);
            
        }
      });
      
    
});

// /* GET home page. */
// router.get('/', function(req, res, next) {
//     console.log("Inserting data");
//     response.message = "Data Inserted";
//     res.send(response);
// });
module.exports = router;