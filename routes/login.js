var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let User = require('../schemas/UserSchema');


var response = {
    statusCode:200,
    message:""
};
router.post('/', function(req,res,next){
    User.find({email:req.body.email,password: req.body.password}, function(err, user){
        if(err) response.message = err;
        if(user[0]){
            req.sessionID = user[0]._id;
            response.message = user[0];
            debugger;

            return res.send(response);
        } else {
            response.message = "Invalid Login Credentials";
            debugger;

            return res.send(response);
        }
        
    });
    
    
});
module.exports = router;