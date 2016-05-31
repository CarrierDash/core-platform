var adminLoginObj = require('./../../models/adminlogins/adminlogin.js');
var userObj = require('./../../models/users/users.js');
var constantObj = require('./../../../constants.js');
var nodemailer = require('nodemailer');
var qs = require('querystring');
var request = require('request');
var jwt = require('jwt-simple');
var moment = require('moment');

//authenticate
exports.authenticate = function(req, res) {
	console.log("authentication request is ",req);
	res.jsonp({'status':'success', 'messageId':200, 'message':'User logged in successfully'});
}

//forgot password
exports.forgotPassword = function(req, res) {

	var outputJSON = "";


	adminLoginObj.findOne({username:req.body.username}, function(err, data) {

		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			
			if(data) {

				var transporter = nodemailer.createTransport({
				    service: constantObj.gmailSMTPCredentials.service,
				    auth: {
				        user: constantObj.gmailSMTPCredentials.username,
				        pass: constantObj.gmailSMTPCredentials.password
				    }
				});				

				transporter.sendMail({
				    from: 'anurags@smartdatainc.net',
				    to: data.email,
				    subject: 'Your Password',
				    text: data.password
				});

				outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successSendingForgotPasswordEmail}
			}
			else {
				outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
			}

		}

		res.jsonp(outputJSON);

	});
}

/*
 |--------------------------------------------------------------------------
 | Generate JSON Web Token
 |--------------------------------------------------------------------------
 */
function createJWT(user) {
  var payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, constantObj.facebookCredentials.token_secret);
}


exports.emailVerification = function(req, res) {
	
	console.log("request is",req);
	/*userObj.findOne({
		token: req.body.token
	}, function(err, data) {
		if (err || !data) {
			console.log("Token not found");
			var response = {
				"code": 400,
				"messageText": "Can't process your request!"
			}
			return res.status(400).send(response);
		} else {
			data.enable = false;
			data.save();
			console.log("now date:", moment().format());
		}
	});*/
}

