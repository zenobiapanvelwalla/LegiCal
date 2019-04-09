var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
let User = require('../schemas/UserSchema');


var response = {
    statusCode:200,
    message:""
};
router.get('/', function(req,res,next){
   req.session.destroy();
   res.send("Session Invalidated");
    
});
module.exports = router;