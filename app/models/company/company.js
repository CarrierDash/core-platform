var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var companySchema = new mongoose.Schema({
  companyname: {type:String, required:'Please enter the name of the company'},
  companyphone: {type:String, required: 'Please enter Phone Number of Company'},
  companyaddress: { type: String, lowercase: true , required: 'Please enter the address of the company'},
  city: { type: String, required:'Please enter the city name'},
  state: {type:String, required: 'Please enter state'},
  zip: {type:String, required: 'Please enter zipcode'},
  is_deleted:{type:Boolean, default:false},
  createdDate:{type:Date, default: Date.now}  
},{collection:'company'});

var companyObj = mongoose.model('company', companySchema);
module.exports = companyObj;
