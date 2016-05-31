var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  firstname: {type:String, required:'Please enter the firstname'},
  lastname: {type:String, required: 'Please enter the lastname'},
  email: { type: String, lowercase: true , required: 'Please enter the email'},
  password: { type: String, select: false, required: 'Please enter the password'},
  company: {type:String},
  type: {type: Number},
  enable: {type: Boolean, default:true},
  is_deleted:{type:Boolean, default:false},
  createdDate:{type:Date, default: Date.now}  
});

userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});


//custom validations

userSchema.path('firstname').validate(function(value) {
  var validateExpression = /^[a-zA-Z ]*$/;
  return validateExpression.test(value);
}, "Please enter valid firstname");


userSchema.path("lastname").validate(function(value) {
  var validateExpression = /^[a-zA-Z]*$/;
  return validateExpression.test(value);
}, "Please enter valid lastname");

userSchema.path("email").validate(function(value) {
   var validateExpression = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
   return validateExpression.test(value);
}, "Please enter valid email address");


//userSchema.plugin(uniqueValidator, {message: "Username already exists"});

var userObj = mongoose.model('users', userSchema);
module.exports = userObj;
