var express = require('express');
var cassandra = require('cassandra-driver');
var router = express.Router();
var contactPoints = ['127.0.0.1'];
var client = new cassandra.Client({contactPoints: contactPoints, keyspace:'cmpe295b', localDataCenter : 'datacenter1'});

var response = {
    statusCode:200,
    message:""
};

router.post('/signup', function(req, res, next) {
    let email= req.body.email;
    let password = req.body.password;
    let orgName = req.body.orgName;

    var query = 'INSERT INTO user (email,  password, orgName) VALUES (?, ?, ?);';
    execute(query, [email, password, orgName], (err, result) => {
        if(err) {
            console.log("fail");
            response.statusCode = 500;
            response.message = "Failed to map user to organization!"
            res.send(response);
        }else{
            response.statusCode = 200;
            response.message = "Mapped user with organization"; 
            res.send(response);
        }
    });  
});

router.post('/login', function(req, res, next) {
    let email= req.body.email;
    let password = req.body.password;

    var query = 'SELECT * FROM user WHERE email = ?';
    execute(query, [email], (err, result) => {
        if(err) {
            console.log("fail");
            response.statusCode = 500;
            response.message = "Some internal error happened!"
            res.send(response);
        }else{
            if(result.rows.length == 0) {
                response.statusCode = 500;
                response.message = "Email address with this user does not exist!"; 
                res.send(response);
            }else if(password !== result.rows[0].password){
               response.statusCode = 500;
               response.message = "Thats an icorrect password! Please try again."; 
               res.send(response);
            }else{
               response.user = result.rows[0];
               var subquery = 'SELECT * FROM organization WHERE org_name = ?';
               execute(subquery, [result.rows[0].orgName], (err, result) => {
                    if(err) {
                        console.log("fail");
                        response.statusCode = 500;
                        response.message = "Some internal error happened!"
                        res.send(response);
                    }else{
                       response.statusCode = 200;
                       response.message = "Login successfull!"; 
                       response.org = result.rows[0];
                       res.send(response);
                    }
               });
               
            }
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