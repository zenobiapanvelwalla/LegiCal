var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var UserSchema =  new Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    email: {type:String, required:false},
    password: {type: String, required:true},
    streetAddress: {type: String},
    city : {type: String},
    state: {type:String},
    zipcode:{type:String},
    organizationCode:{type:String},
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',UserSchema);