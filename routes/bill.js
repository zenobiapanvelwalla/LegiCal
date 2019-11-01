var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let Bill = require('../schemas/BillSchema');
//https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html
const axios = require('axios');

var response = {
    statusCode:200,
    message:""
};
router.get('/',function(req,res,next){
  
  axios .get("https://api.legiscan.com/?key=B36e51861aaf4e8d544f86c1ce66fe98&op=getMasterList&state=CA")
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/search-bill/:state/:billNumber',function(req,res,next){
  axios .get("https://api.legiscan.com/?key=B36e51861aaf4e8d544f86c1ce66fe98&op=search&state="+req.params.state+"&bill="+req.params.billNumber)
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get('/get-roll-call/:rollCallId',function(req,res,next){
  axios .get("https://api.legiscan.com/?key=B36e51861aaf4e8d544f86c1ce66fe98&op=getRollcall&id="+req.params.rollCallId)
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});
//get bill text
router.get('/get-bill-text/:docId',function(req,res,next){
  axios .get("https://api.legiscan.com/?key=B36e51861aaf4e8d544f86c1ce66fe98&op=getBillText&id="+req.params.docId)
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

//get all details of a particular bill
//https://api.legiscan.com/?key=APIKEY&op=getBill&id=BILL_ID
router.get('/:billId',function(req,res,next){
  axios .get("https://api.legiscan.com/?key=B36e51861aaf4e8d544f86c1ce66fe98&op=getBill&id="+req.params.billId)
    .then(response => {
      return res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});


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