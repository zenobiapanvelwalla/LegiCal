var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({contactPoints: contactPoints, keyspace:'cmpe295b', localDataCenter : 'datacenter1'});;

var response = {
    statusCode:200,
    message:""
};


router.post('/getComments', function(req, res, next) {
    let billId = req.body.billId.toString();
    var query = 'SELECT * FROM discussion where billId = ?';
    execute(query, [billId], (err, result) => {
        if(err) {
            console.log("fail");
            response.statusCode = 500;
            response.message = "Some internal error happened!"
            res.send(response);
        }else {
            console.log("successfull");
            response = result.rows[0];
            response.statusCode = 200;
            response.message = "Retrived comment succfully";
            
            res.send(response);
        }
    });
});

//Ensure all queries are executed before exit
function execute(query, params, callback) {
  return new Promise((resolve, reject) => {
    client.execute(query, params, { prepare: true }, (err, result) => {
      if(err) {
        console.log(err);
        reject()
      } else {
        callback(err, result);
        resolve()
      }
    });
  });
}

module.exports = router;