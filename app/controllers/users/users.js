var userObj = require('./../../models/users/users.js');
var constantObj = require('./../../../constants.js');
var jwt = require('jwt-simple');
var moment = require('moment');
var nodemailer = require('nodemailer');


exports.list = function(req, res) {
	
	var outputJSON = "";
	
	userObj.find({is_deleted:false}, function(err, data) {
		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 'data': data}
			
		}
		res.jsonp(outputJSON);
	});
}

exports.add = function(req, res) {

	var errorMessage = "";
	var outputJSON ;
	var userModelObj = {};
			
	userObj.find({is_deleted:false}, function(err, data) {
		if(err){
			console.log("There are no users in the table");
		} else {
			
			if(Object.keys(data).length > 0){
				
				userModelObj.type = req.body.type;
			} else {
				
				userModelObj.type = 1;
			}

			console.log("company is", JSON.stringify(req.body.company_id));
			userModelObj.firstname = req.body.firstname;
			userModelObj.lastname = req.body.lastname;
			userModelObj.email = req.body.email;
			userModelObj.password = req.body.password;
			userModelObj.phone = req.body.phone;
			userModelObj.company = req.body.company;
			//
			userModelObj.enable = true;

			console.log("data of user",userModelObj);

			userObj(userModelObj).save(userModelObj, function(err, data) { 
				console.log('err',err,'data',data);
				if(err) {

					switch(err.name) {
						case 'ValidationError':
						
							for(field in err.errors) {
								if(errorMessage == "") {
									errorMessage = err.errors[field].message;
								}
								else {							
									errorMessage+=", " + err.errors[field].message;
								}
							}//for
						break;
					}//switch
					
					outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
				}//if
				else {
					userObj.findOne({
						email: req.body.email
					},function(err, data) {

						if (err) {
							console.log(err);
							return res.send(err);


						} else {
							if (!data) {
								outputJSON = {
									'status': 'failure',
									'messageId': 203,
									'message': constantObj.messages.errorRetreivingData
								}
								return res.send(outputJSON);
							}
								
							var token = createJWT(data);
							// console.log("token:::", token);
							var port = ""//process.env.PORT|| 3000 ; 
							var verificationUrl = "http://"+ req.headers.host +"/#/email-verification";
							console.log(verificationUrl) ; 
							var transporter = nodemailer.createTransport({
									service: constantObj.gmailSMTPCredentials.service,
									auth: {
										user: constantObj.gmailSMTPCredentials.username,
										pass: constantObj.gmailSMTPCredentials.password
									}
								}

							);
							//sending email
							transporter.sendMail({
								from: 'nishantk@smartdatainc.net',
								to: data.email,
								subject: 'Email Verification',
								text: "Follow this link to verified your email address:" + verificationUrl + "/" + token
							}, function(err) {
								if (err) {
									return res.send(err)
								}

								var adding = new userObj({
									"userId":data._id,					
									"email": req.body.email,
									"token": token/*,
									"expirationPeriod": moment(new Date()).add(1, 'days').format()*/
								});

								console.log("req.body.username", req.body.username);
								adding.save(function(err, post) {
									if (err) {
										var response = {
											"code": 401,
											"messageText": "Token is already generated!"
										};
										return res.status(401).send(response);
									}

									if (post) {
										var response = {
											"code": 200,
											"messageText": "email link sent to " + data.email + " !"
										}

										//return res.status(200).send(response)

									}


								});



							});
						}
					});

					outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userSuccess};
				
				}

				res.jsonp(outputJSON);

			});
		}
	});

}


exports.updateUserStatus = function(req, res) {

	var outputJSON = "";
	var errorCount =0;
	var inputData = req.body;

	
	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  userObj.findById(id, function(err, data) {

  		  	if(err) {
  		  		errorCount++;
  		  	}
  		  	else {
  		  		data.enable = inputData[attributename].enable;
  		  		data.save(function(err, data) {

  		  			if(err) {
  		  				errorCount++;
  		  			}
  		  			
  		  		});
  		  	}

  		  	
  		  });

	}

	if(errorCount > 0) {
		outputJSON = {'status': 'success', 'messageId':402, 'message':constantObj.messages.userStatusUpdateFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userStatusUpdateSuccess};
	}

	res.jsonp(outputJSON);
}

exports.delete_user = function(req, res) {

	var outputJSON = "";
	var errorCount =0;
	var inputData = req.body;

	
	for(var attributename in inputData){
  		 
  		  id = inputData[attributename]._id;
  		   		  
  		  userObj.findById(id, function(err, data) {

  		  	if(err) {
  		  		errorCount++;
  		  	}
  		  	else {
  		  		data.is_deleted = inputData[attributename].is_deleted;

  		    		data.save(function(err, data) {

  		  			if(err) {
  		  				errorCount++;
  		  			}
  		  			
  		  		});
  		  	}

  		  	
  		  });

	}

	if(errorCount > 0) {
		outputJSON = {'status': 'success', 'messageId':403, 'message':constantObj.messages.userDeleteFailure};
	}
	else {
		outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userDeleteSuccess};
	}

	res.jsonp(outputJSON);


}

exports.edit_user = function(req, res) {

	var outputJSON = "";
	
	userObj.findById(req.params.id, function(err, data) {

		if(err) {
			outputJSON = {'status':'failure', 'messageId':203, 'message': constantObj.messages.errorRetreivingData};
		}
		else {
			outputJSON = {'status':'success', 'messageId':200, 'message': constantObj.messages.successRetreivingData, 'data': data}
		}

		res.jsonp(outputJSON);
	});
}

exports.update_user = function(req, res) {

	var errorMessage = "";
	var outputJSON = "";

	
	//update user
	var id = req.body._id;
	

	userObj.findById(id, function(err, data) {
		if(!err) {
			data.firstname = req.body.firstname;
			data.lastname = req.body.lastname;
			data.email = req.body.email;
			//data.username = req.body.username;
			data.displayName = req.body.displayname;
			data.enable = req.body.enable;


			data.save(function(err, data) {
				
				if(err) {
					switch(err.name) {
						case 'ValidationError':
							for(field in err.errors) {
								if(errorMessage == "") {
									errorMessage = err.errors[field].message;
								}
								else {							
									errorMessage+="\r\n" + err.errors[field].message;
								}
							}//for
						break;
					}//switch

					outputJSON = {'status': 'failure', 'messageId':401, 'message':errorMessage};
				}//if
				else {
					outputJSON = {'status': 'success', 'messageId':200, 'message':constantObj.messages.userUpdateSuccess};
				}


				res.jsonp(outputJSON);
			});
		}
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