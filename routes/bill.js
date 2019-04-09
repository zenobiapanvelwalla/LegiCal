var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let Bill = require('../schemas/BillSchema');

var response = {
    statusCode:200,
    message:""
};

router.post('/create', function(req, res, next) {
      console.log("Inserting Bill");
    
      var billData = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        dateIntroduced:req.body.dateIntroduced
      }

      Bill.create(billData, function (err, user) {
        if (err) {
            response.message = err;
            response.statusCode = 500;
            return res.send(response);
          
        } else {
            response.message = "Bill Inserted"; 
            return res.send(response);
            
        }
      });    
});

module.exports = router;