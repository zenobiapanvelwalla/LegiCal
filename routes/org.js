var cassandra = require('cassandra-driver');
var express = require('express');
var router = express.Router();
//var authProvider = new cassandra.auth.PlainTextAuthProvider('Username', 'Password');
//Replace PublicIP with the IP addresses of your clusters
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({contactPoints: contactPoints, keyspace:'cmpe295b', localDataCenter : 'datacenter1'});

var fs = require("fs");
var contents = fs.readFileSync("data/CA.json");
var jsonContent = JSON.parse(contents);

var response = {
    statusCode:200,
    message:""
};

// TODO : prepare organization
router.post('/', function(req,res,next){
	var payload = req.body;
	payload.tags = [ "Cannabis"];
	const bills = Object.values(jsonContent.masterlist)
	const bills1 =  bills.filter((bill) => payload.tags.some((tag) =>  bill.title && bill.title.indexOf(tag) >= 0));

	var query = 'INSERT INTO organization (ord_id,  org_name, org_desc, tags, bills) VALUES (?,?,?,?,?);';
	execute(query, ["3", "Sri", "Sruchoieta", payload.tags, bills1], (err, result) => {
		if(err) {
			console.log("fail");
			response.statusCode = 500;
			response.message = "Failed to add organization!"
			res.send(response);
		}else{
			console.log("success");
			response.message = "Organiztion added successfully";
			res.send(response);
		}
	});
});

router.get('/:id', function(req,res,next){
	 var id = req.params.id;
	 var query = 'SELECT * from organization where ord_id = ?';
	 execute(query, [id], (err, result) => {
	 	if(err) {
			console.log("fail");
			response.statusCode = 500;
			response.message = "Failed to get organization!"
			res.send(response);
		}else{
			console.log("success");
			response.message = "Retrieved organization successfully";
			response.org = result.rows[0];
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