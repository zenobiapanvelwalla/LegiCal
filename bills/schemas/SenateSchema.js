var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var SenateSchema =  new Schema({
    id :{type:String, required:true},
    name:{type:String, required:true},
    age: {type:String, required:false},
    education: {type: String, required:true},
    address: {type: String, required:true},
	website: {type: String, required:true}
});

module.exports = mongoose.model('senate', SenateSchema);