var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let Senate = require('../schemas/SenateSchema');

var response = {
    statusCode:200,
    message:""
};

router.post('/create', function(req, res, next) {
      console.log("Inserting Senate");
    
     var senateData = {
        id: req.body.id,
        name: req.body.title,
        age: req.body.description,
        education:req.body.dateIntroduced,
        address: req.body.address,
        url: req.body.url
      }

      Senate.create(senateData, function (err, user) {
        if (err) {
            response.message = err;
            response.statusCode = 500;
            return res.send(response);
          
        } else {
            response.message = "Senate Inserted"; 
            return res.send(response);
            
        }
      });    
});

module.exports = router;