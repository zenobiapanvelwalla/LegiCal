var cassandra = require('cassandra-driver');
var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();
let clientURL = "http://localhost:3000/";
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

	console.log(req);
	let organizationName=  req.body.organizationName;
    let address= req.body.address;
    let phoneNumber =  req.body.phoneNumber;
    let users = req.body.users;

	var payload = req.body;
	const bills = Object.values(jsonContent.masterlist)
	const bills1 =  bills.filter((bill) => payload.tags.some((tag) =>  bill.title && bill.title.indexOf(tag) >= 0));
	var query = 'INSERT INTO organization (uuid,  org_name, address, phone, tags, bills) VALUES (uuid(),?,?,?,?,?);';
	execute(query, [organizationName, address, phoneNumber, payload.tags, bills1], (err, result) => {
		if(err) {
			console.log("fail");
			response.statusCode = 500;
			response.message = "Failed to add organization!"
			res.send(response);
		}else{
			console.log("success");
			response.orgName = organizationName;
			response.message = "Organiztion added successfully";

			var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: 'rujsricheta@gmail.com',
                  pass: ''
              }
          	});

			let link = clientURL +'user_signup/'+ organizationName;
	        var mailOptions = {
	            from: 'rujsricheta@gmail.com',
	            to: users,
	            subject: 'LegiCal : You are invited to register with '+organizationName,
	            text: 'Please signup on -> ' +  encodeURI(link)

	        };

  		    transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                  console.log(error);
              } else {
                  console.log("Email sent!");
              }
            });
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
