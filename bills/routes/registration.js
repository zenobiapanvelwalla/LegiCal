var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'cmpe295',
    password: 'cmpe@295',
    database: 'registration'
});

conn.connect(function (error) {
    if (error) {
        console.log("DB Connection not successful!!")
    }
    else {
        console.log("DB Connection Successful!!")
    }
});


app.use(bodyParser());
app.listen(3005, function () {
    console.log("Listening server on port 3005");
});

app.post('/registerOrg', function (req, res) {
    conn.query("insert into organization(name,address,email,phone,zipcode) values('" + req.body['name'] + "','" + req.body['address'] + "','" + req.body['email'] + "','" + req.body['phone'] + "','" + req.body['zipcode'] + "'", function (error) {
        if (error) {
            console.log("Failed to insert data into Organization Table")
        }
        else {
            console.log("***********Data inserted successfully************")
        }
    })
    res.end(JSON.stringify(req.body))
    //console.log(req.body['name'])
})

app.post('/registerUser', function (req, res) {
    conn.query("insert into organization(name,address,organization,email,phone,zipcode,password) values('" + req.body['name'] + "','" + req.body['address'] + "','" + req.body['organization'] + "','" + req.body['email'] + "','" + req.body['phone'] + "','" + req.body['zipcode'] + "','" + req.body['password'], function (error) {
        if (error) {
            console.log("Failed to insert data into User Table")
        }
        else {
            console.log("***********Data inserted successfully************")
        }
    })
    res.end(JSON.stringify(req.body));
    //console.log(req.body['name']);
})

