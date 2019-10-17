var mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var BillSchema =  new Schema({
    id :{type:String, required:true},
    title:{type:String, required:true},
    description: {type:String, required:false},
    dateIntroduced: {type: String, required:true}
});

module.exports = mongoose.model('bills', BillSchema);